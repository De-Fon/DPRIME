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
import { createEntity, deleteEntity as removeEntity, saveEntity, type Kind } from "@/lib/store";

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
  if ("errors" in result) return { errors: result.errors, values };

  try {
    if (originalSlug === null) {
      const created = await createEntity(kind, result.slug, result.data);
      if (!created) {
        return {
          errors: { [schema.hasSlug ? "slug" : "type"]: "This already exists" },
          values,
        };
      }
    } else {
      // For partnerships the key is derived, so editing an endpoint changes it.
      if (result.slug !== originalSlug) {
        const created = await createEntity(kind, result.slug, result.data);
        if (!created) return { errors: { type: "This partnership already exists" }, values };
        await removeEntity(kind, originalSlug);
      } else {
        await saveEntity(kind, result.slug, result.data);
      }
    }
  } catch (err) {
    console.error("admin save failed", err);
    return { errors: {}, values, formError: "Could not save. Check the database connection and try again." };
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
    await removeEntity(kind, slug);
  } catch (err) {
    console.error("admin delete failed", err);
    redirect(`${back}?error=${encodeURIComponent("Could not delete. Try again.")}`);
  }
  refresh();
  redirect(`${back}?deleted=1`);
}
