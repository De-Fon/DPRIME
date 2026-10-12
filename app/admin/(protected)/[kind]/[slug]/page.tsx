import { notFound } from "next/navigation";
import EntityForm from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/auth";
import { storageConfigured } from "@/lib/storage";
import { SCHEMAS, SEGMENT_TO_KIND, toFormValues } from "@/lib/adminSchema";
import { getEntity } from "@/lib/store";

export default async function AdminEdit({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>;
}) {
  await requireAdmin();
  const { kind: segment, slug: rawSlug } = await params;
  const kind = SEGMENT_TO_KIND[segment];
  if (!kind) notFound();
  const slug = decodeURIComponent(rawSlug);
  const entity = await getEntity(kind, slug);
  if (!entity) notFound();
  const schema = SCHEMAS[kind];
  return (
    <>
      <h1 className="font-display text-3xl text-ink mb-6">Edit {schema.singular}</h1>
      <EntityForm
        kind={kind}
        segment={segment}
        fields={schema.fields}
        initial={toFormValues(schema, entity as unknown as Record<string, unknown>)}
        originalSlug={slug}
        storageEnabled={storageConfigured()}
      />
    </>
  );
}
