// Image storage in Supabase Storage, via its REST API with the service-role
// key. No SDK needed. Server-only: the key must never reach the browser.
//
// Uploads go to a PUBLIC bucket, so images are served from a plain URL and
// next/image can optimise them. Writes are only possible with the service-role
// key, which stays on the server.

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // under Vercel's 4.5 MB body cap

const BUCKET = () => process.env.SUPABASE_STORAGE_BUCKET || "images";

export function storageConfigured(): boolean {
  return !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function base(): string {
  return process.env.SUPABASE_URL!.replace(/\/+$/, "");
}

// Legacy service_role keys are JWTs (sent as Bearer and apikey). The newer
// sb_secret_ keys are not JWTs and go in the apikey header only.
function authHeaders(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return key.startsWith("sb_") ? { apikey: key } : { apikey: key, Authorization: `Bearer ${key}` };
}

function publicPrefix(): string {
  return `${base()}/storage/v1/object/public/${BUCKET()}/`;
}

// SVG is excluded on purpose: it can carry scripts.
const SIGNATURES: { type: string; ext: string; match: (b: Uint8Array) => boolean }[] = [
  { type: "image/jpeg", ext: "jpg", match: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    type: "image/png",
    ext: "png",
    match: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  {
    type: "image/webp",
    ext: "webp",
    // "RIFF" .... "WEBP"
    match: (b) => b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
];

async function sniff(file: File) {
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  return SIGNATURES.find((s) => s.match(head)) ?? null;
}

// Returns an error message, or null if the file is acceptable. Checks the real
// bytes, not the browser-supplied type.
export async function validateImageFile(file: File): Promise<string | null> {
  if (file.size === 0) return null;
  if (file.size > MAX_IMAGE_BYTES) return "Image must be 4 MB or smaller";
  if (!(await sniff(file))) return "Use a JPEG, PNG or WebP image";
  return null;
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const sig = await sniff(file);
  if (!sig) throw new Error("unsupported image type");
  const path = `${folder}/${crypto.randomUUID()}.${sig.ext}`;
  const res = await fetch(`${base()}/storage/v1/object/${BUCKET()}/${path}`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": sig.type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "x-upsert": "false",
    },
    body: new Uint8Array(await file.arrayBuffer()),
  });
  if (!res.ok) {
    throw new Error(`storage upload failed: ${res.status} ${await res.text().catch(() => "")}`);
  }
  return publicPrefix() + path;
}

// True only for URLs inside our own bucket, so a pasted external link is never
// treated as something we can delete.
export function isOurImage(url: string): boolean {
  return storageConfigured() && url.startsWith(publicPrefix());
}

// Best effort: an orphaned file is harmless, a failed save is not.
export async function deleteImage(url: string): Promise<void> {
  if (!isOurImage(url)) return;
  const path = url.slice(publicPrefix().length);
  try {
    await fetch(`${base()}/storage/v1/object/${BUCKET()}/${path}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  } catch (err) {
    console.error("image delete failed", err);
  }
}
