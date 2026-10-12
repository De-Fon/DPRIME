import { REGIONS, TOPICS, type Ecosystem } from "./ecosystem";
import { partnershipKey, type Kind } from "./store";

// Declarative description of each editable entity. The admin form renderer
// and the server-side validator both read from this, so adding a field means
// editing one place.

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "multi" // checkbox set, value is string[]
  | "tags" // comma separated, value is string[]
  | "date"
  | "number"
  | "ref" // slug of a community or organization
  | "image"; // file upload stored in Supabase Storage; value is the URL

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: readonly string[];
  required?: boolean;
  help?: string;
}

export interface KindSchema {
  kind: Kind;
  segment: string; // URL segment under /admin
  singular: string;
  plural: string;
  hasSlug: boolean;
  fields: Field[];
  label: (d: Record<string, unknown>) => string;
  detail: (d: Record<string, unknown>) => string;
}

const regionField: Field = { name: "region", label: "Region", type: "select", options: REGIONS, required: true };
const topicsField: Field = { name: "topics", label: "Topics", type: "multi", options: TOPICS };
const slugField: Field = {
  name: "slug",
  label: "Slug",
  type: "text",
  required: true,
  help: "Lowercase letters, numbers and hyphens. Cannot be changed after creation.",
};

const imageField = (label: string): Field => ({
  name: "imageUrl",
  label,
  type: "image",
  help: "JPEG, PNG or WebP, up to 4 MB. Optional.",
});

const str = (v: unknown) => (typeof v === "string" ? v : "");

export const SCHEMAS: Record<Kind, KindSchema> = {
  community: {
    kind: "community",
    segment: "communities",
    singular: "community",
    plural: "Communities",
    hasSlug: true,
    label: (d) => str(d.name),
    detail: (d) => `${str(d.kind)} · ${str(d.location)}`,
    fields: [
      slugField,
      imageField("Image"),
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "kind",
        label: "Kind",
        type: "select",
        required: true,
        options: ["university club", "developer community", "open-source community", "startup community", "innovation hub"],
      },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "mission", label: "Mission", type: "textarea", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      regionField,
      topicsField,
      { name: "website", label: "Website", type: "text", help: "Full http(s) URL. Optional." },
      { name: "channels", label: "Channels", type: "tags", help: "Comma separated, e.g. WhatsApp, Discord" },
      { name: "lookingFor", label: "Looking for", type: "tags", help: "Comma separated collaboration interests" },
      { name: "memberCount", label: "Member count", type: "number" },
    ],
  },
  organization: {
    kind: "organization",
    segment: "organizations",
    singular: "organization",
    plural: "Organizations",
    hasSlug: true,
    label: (d) => str(d.name),
    detail: (d) => `${str(d.kind)} · ${str(d.location)}`,
    fields: [
      slugField,
      imageField("Image"),
      { name: "name", label: "Name", type: "text", required: true },
      { name: "kind", label: "Kind", type: "select", required: true, options: ["company", "institution", "nonprofit"] },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      regionField,
      topicsField,
      { name: "website", label: "Website", type: "text", help: "Full http(s) URL. Optional." },
    ],
  },
  event: {
    kind: "event",
    segment: "events",
    singular: "event",
    plural: "Events",
    hasSlug: true,
    label: (d) => str(d.title),
    detail: (d) => `${str(d.kind)} · ${str(d.date)} · ${str(d.location)}`,
    fields: [
      slugField,
      imageField("Image"),
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "kind",
        label: "Kind",
        type: "select",
        required: true,
        options: ["meetup", "hackathon", "conference", "workshop", "webinar", "demo day"],
      },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      regionField,
      topicsField,
      { name: "hostSlug", label: "Host", type: "ref", required: true, help: "Slug of the hosting community" },
      { name: "partnerSlugs", label: "Partners", type: "tags", help: "Comma separated slugs of communities or organizations" },
    ],
  },
  program: {
    kind: "program",
    segment: "programs",
    singular: "program",
    plural: "Programs",
    hasSlug: true,
    label: (d) => str(d.title),
    detail: (d) => `${str(d.kind)} · ${str(d.duration)}`,
    fields: [
      slugField,
      imageField("Image"),
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "kind",
        label: "Kind",
        type: "select",
        required: true,
        options: ["fellowship", "bootcamp", "incubator", "mentorship", "developer program"],
      },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "duration", label: "Duration", type: "text", required: true },
      topicsField,
      { name: "runBySlug", label: "Run by", type: "ref", required: true, help: "Slug of a community or organization" },
    ],
  },
  opportunity: {
    kind: "opportunity",
    segment: "opportunities",
    singular: "opportunity",
    plural: "Opportunities",
    hasSlug: true,
    label: (d) => str(d.title),
    detail: (d) => `${str(d.kind)} · ${str(d.location)}`,
    fields: [
      slugField,
      imageField("Image"),
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "kind",
        label: "Kind",
        type: "select",
        required: true,
        options: ["job", "internship", "freelance", "project", "scholarship", "hackathon", "fellowship", "grant", "speaking", "collaboration"],
      },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      regionField,
      topicsField,
      { name: "postedBySlug", label: "Posted by", type: "ref", required: true, help: "Slug of a community or organization" },
      { name: "deadline", label: "Deadline", type: "date", help: "Optional" },
    ],
  },
  partnership: {
    kind: "partnership",
    segment: "partnerships",
    singular: "partnership",
    plural: "Partnerships",
    hasSlug: false,
    label: (d) => `${str(d.fromSlug)} → ${str(d.toSlug)}`,
    detail: (d) => str(d.type),
    fields: [
      { name: "fromSlug", label: "From", type: "ref", required: true },
      { name: "toSlug", label: "To", type: "ref", required: true },
      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
        options: ["partner", "sponsor", "collaborator", "event partner", "knowledge partner", "technology partner", "community partner", "academic partner"],
      },
    ],
  },
};

export const SEGMENT_TO_KIND: Record<string, Kind> = Object.fromEntries(
  Object.values(SCHEMAS).map((s) => [s.segment, s.kind]),
);

export type FormValues = Record<string, string | string[]>;

export interface FormState {
  errors: Record<string, string>;
  formError?: string;
  values?: FormValues;
  // Changes on every result so the form can remount and re-apply defaults.
  key?: string;
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isRealDate(v: string): boolean {
  if (!DATE_RE.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(v);
}

function isHttpUrl(v: string): boolean {
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function rawValues(schema: KindSchema, fd: FormData): FormValues {
  const out: FormValues = {};
  for (const f of schema.fields) {
    if (f.type === "image") {
      // The file itself is read in the action; the form value is the URL
      // already stored, or "" if the admin ticked "remove".
      out[f.name] =
        fd.get(`${f.name}__remove`) === "on" ? "" : String(fd.get(`${f.name}__current`) ?? "").trim();
      continue;
    }
    out[f.name] =
      f.type === "multi"
        ? fd.getAll(f.name).map(String)
        : String(fd.get(f.name) ?? "").trim();
  }
  return out;
}

export function splitTags(v: string): string[] {
  return v.split(",").map((t) => t.trim()).filter(Boolean);
}

// Validate raw form input against the schema. Returns either field errors or
// the typed record and its storage key. Never trusts the browser: select and
// multi values are checked against the allowed options, and refs against the
// current ecosystem.
export function validate(
  schema: KindSchema,
  raw: FormValues,
  eco: Ecosystem,
):
  | { ok: false; errors: Record<string, string> }
  | { ok: true; data: Record<string, unknown>; slug: string } {
  const errors: Record<string, string> = {};
  const data: Record<string, unknown> = {};
  const known = new Set([
    ...eco.communities.map((c) => c.slug),
    ...eco.organizations.map((o) => o.slug),
  ]);

  for (const f of schema.fields) {
    const v = raw[f.name];
    const text = typeof v === "string" ? v : "";
    const empty = Array.isArray(v) ? v.length === 0 : text === "";

    if (empty) {
      if (f.required) errors[f.name] = "Required";
      if (f.type === "multi" || f.type === "tags") data[f.name] = [];
      continue;
    }

    switch (f.type) {
      case "text":
        if (f.name === "slug") {
          if (!SLUG_RE.test(text)) errors[f.name] = "Use lowercase letters, numbers and hyphens";
          else data[f.name] = text;
        } else if (f.name === "website") {
          if (!isHttpUrl(text)) errors[f.name] = "Must be a valid http(s) URL";
          else data[f.name] = text;
        } else data[f.name] = text;
        break;
      case "textarea":
        data[f.name] = text;
        break;
      case "select":
        if (!f.options?.includes(text)) errors[f.name] = "Choose a valid option";
        else data[f.name] = text;
        break;
      case "multi": {
        const list = v as string[];
        if (list.some((x) => !f.options?.includes(x))) errors[f.name] = "Invalid selection";
        else data[f.name] = list;
        break;
      }
      case "tags": {
        const list = splitTags(text);
        if (f.name === "partnerSlugs") {
          const bad = list.filter((s) => !known.has(s));
          if (bad.length) errors[f.name] = `Unknown: ${bad.join(", ")}`;
        }
        data[f.name] = list;
        break;
      }
      case "date":
        if (!isRealDate(text)) errors[f.name] = "Use a real date (YYYY-MM-DD)";
        else data[f.name] = text;
        break;
      case "number": {
        const n = Number(text);
        if (!Number.isInteger(n) || n < 0) errors[f.name] = "Must be a whole number, 0 or more";
        else data[f.name] = n;
        break;
      }
      case "image":
        if (!isHttpUrl(text)) errors[f.name] = "Invalid image URL";
        else data[f.name] = text;
        break;
      case "ref":
        if (!known.has(text)) errors[f.name] = "No community or organization with this slug";
        else data[f.name] = text;
        break;
    }
  }

  if (schema.kind === "partnership" && data.fromSlug && data.fromSlug === data.toSlug) {
    errors.toSlug = "A community cannot partner with itself";
  }
  if (schema.kind === "event" && typeof data.hostSlug === "string") {
    if (!eco.communities.some((c) => c.slug === data.hostSlug)) {
      errors.hostSlug = "Host must be a community";
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  const slug = schema.hasSlug
    ? (data.slug as string)
    : partnershipKey(data as { fromSlug: string; toSlug: string; type: never });
  if (schema.hasSlug) delete data.slug; // the slug is stored inside the record
  return { ok: true, data: schema.hasSlug ? { slug, ...data } : data, slug };
}

// Entity -> string/array form values for the edit screen.
export function toFormValues(schema: KindSchema, d: Record<string, unknown>): FormValues {
  const out: FormValues = {};
  for (const f of schema.fields) {
    const v = d[f.name];
    if (f.type === "multi") out[f.name] = Array.isArray(v) ? v.map(String) : [];
    else if (f.type === "tags") out[f.name] = Array.isArray(v) ? v.join(", ") : "";
    else out[f.name] = v === undefined || v === null ? "" : String(v);
  }
  return out;
}
