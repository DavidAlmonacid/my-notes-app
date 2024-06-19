import { getNoteById } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;
  console.log({ id });

  const note = await getNoteById(id);

  return Response.json({ note });
}
