import { getNotesLengthByCollectionId } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;
  const count = await getNotesLengthByCollectionId(id);

  return Response.json({ count });
}
