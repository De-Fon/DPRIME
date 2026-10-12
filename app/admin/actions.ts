"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  authConfigured,
  checkPassword,
  clearSessionCookie,
  requireAdmin,
  setSessionCookie,
} from "@/lib/auth";
import { dbConfigured } from "@/lib/db";
import { getEcosystem, referencesTo } from "@/lib/ecosystem";
import { SCHEMAS, rawValues, validate, type FormState } from "@/lib/adminSchema";
import { createEntity, deleteEntity as removeEntity, getEntity, saveEntity, type Kind } from "@/lib/store";
import { deleteImage, storageConfigured, uploadImage, validateImageFile } from "@/lib/storage";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prev: LoginState, fd: FormData): Promise<LoginState> {
  if (!authConfigured()) {
    return { error: "Admin login is not configured on this deployment." };
  }
  const ok = checkPassword(String(fd.get("password") ?? ""));
  if (!ok) {
    // Slows down online guessing. There is no shared state across serverless
    // instances, so this is a speed bump, not a lockout.
    await new Promise((r) => setTimeout(r, 750));
    return { error: "Incorrect password." };
  }
  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}

function refresh() {
  // Public pages read the same data, so refresh everything.
  revalidatePath("/", "layout");
}

export async function saveEntityAction(
  kind: Kind,
  originalSlug: string | null,
  prev: FormState,
  fd: FormData,
): Promise<FormState> {
  const state = await saveEntity_(kind, originalSlug, prev, fd);
  return { ...state, key: randomUUID() };
}

async function saveEntity_(
  kind: Kind,
  originalSlug: string | null,
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireAdmin();
  const schema = SCHEMAS[kind];
  const values = rawValues(schema, fd);

  if (!dbConfigured()) {
    return { errors: {}, values, formError: "DATABASE_URL is not set, so changes cannot be saved." };
  }

  // Slug is immutable on edit: take it from the URL, not the form.
  if (originalSlug && schema.hasSlug) values.slug = originalSlug;

  const eco = await getEcosystem();
  const result = validate(schema, values, eco);
  const errors: Record<string, string> = "errors" in result ? { ...result.errors } : {};

  // Newly chosen image files, checked by their real bytes before anything is
  // stored. They are uploaded only once the rest of the form is valid.
  const uploads: Record<string, File> = {};
  for (const f of schema.fields) {
    if (f.type !== "image") continue;
    const file = fd.get(f.name);
    if (!(file instanceof File) || file.size === 0) continue;
    if (!storageConfigured()) {
      errors[f.name] = "Image storage is not configured (see the Supabase guide)";
      continue;
    }
    const problem = await validateImageFile(file);
    if (problem) errors[f.name] = problem;
    else uploads[f.name] = file;
  }
  if (Object.keys(errors).length || "errors" in result) return { errors, values };

  const data = { ...result.data };
  const previous = originalSlug
    ? ((await getEntity(kind, originalSlug)) as unknown as Record<string, unknown> | null)
    : null;
  const uploaded: string[] = [];

  try {
    for (const [field, file] of Object.entries(uploads)) {
      const url = await uploadImage(file, schema.segment);
      uploaded.push(url);
      data[field] = url;
    }

    if (originalSlug === null) {
      const created = await createEntity(kind, result.slug, data);
      if (!created) {
        await Promise.all(uploaded.map(deleteImage));
        return {
          errors: { [schema.hasSlug ? "slug" : "type"]: "This already exists" },
          values,
        };
      }
    } else {
      // For partnerships the key is derived, so editing an endpoint changes it.
      if (result.slug !== originalSlug) {
        const created = await createEntity(kind, result.slug, data);
        if (!created) return { errors: { type: "This partnership already exists" }, values };
        await removeEntity(kind, originalSlug);
      } else {
        await saveEntity(kind, result.slug, data);
      }
    }
  } catch (err) {
    console.error("admin save failed", err);
    await Promise.all(uploaded.map(deleteImage));
    return { errors: {}, values, formError: "Could not save. Check the database and storage connection and try again." };
  }

  // The record now points at the new image (or none); drop the file it replaced.
  for (const f of schema.fields) {
    if (f.type !== "image") continue;
    const old = previous?.[f.name];
    if (typeof old === "string" && old && old !== data[f.name]) await deleteImage(old);
  }

  refresh();
  redirect(`/admin/${schema.segment}?saved=1`);
}

export async function deleteEntityAction(kind: Kind, slug: string): Promise<void> {
  await requireAdmin();
  const schema = SCHEMAS[kind];
  const back = `/admin/${schema.segment}`;

  if (!dbConfigured()) redirect(`${back}?error=${encodeURIComponent("DATABASE_URL is not set.")}`);

  if (kind === "community" || kind === "organization") {
    const refs = referencesTo(await getEcosystem(), slug);
    if (refs.length) {
      const msg = `Cannot delete "${slug}": still referenced by ${refs.join(", ")}.`;
      redirect(`${back}?error=${encodeURIComponent(msg)}`);
    }
  }

  try {
    const existing = (await getEntity(kind, slug)) as unknown as Record<string, unknown> | null;
    await removeEntity(kind, slug);
    if (typeof existing?.imageUrl === "string") await deleteImage(existing.imageUrl);
  } catch (err) {
    console.error("admin delete failed", err);
    redirect(`${back}?error=${encodeURIComponent("Could not delete. Try again.")}`);
  }
  refresh();
  redirect(`${back}?deleted=1`);
}
