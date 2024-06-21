import { updateNoteContent } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;
  const { content } = await request.json();

  await updateNoteContent(id, content);

  return Response.json({ message: "Note content updated" });
}
