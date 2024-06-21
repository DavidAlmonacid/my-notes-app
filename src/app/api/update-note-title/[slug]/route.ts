import { updateNoteTitle } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;
  const { title } = await request.json();

  await updateNoteTitle(id, title);

  return Response.json({ message: "Note title updated" });
}
