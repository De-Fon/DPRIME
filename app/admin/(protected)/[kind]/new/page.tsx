import { notFound } from "next/navigation";
import EntityForm from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/auth";
import { storageConfigured } from "@/lib/storage";
import { SCHEMAS, SEGMENT_TO_KIND, toFormValues } from "@/lib/adminSchema";

export default async function AdminNew({ params }: { params: Promise<{ kind: string }> }) {
  await requireAdmin();
  const { kind: segment } = await params;
  const kind = SEGMENT_TO_KIND[segment];
  if (!kind) notFound();
  const schema = SCHEMAS[kind];
  return (
    <>
      <h1 className="font-display text-3xl text-ink mb-6">New {schema.singular}</h1>
      <EntityForm
        kind={kind}
        segment={segment}
        fields={schema.fields}
        initial={toFormValues(schema, {})}
        originalSlug={null}
        storageEnabled={storageConfigured()}
      />
    </>
  );
}
