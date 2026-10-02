import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const noteId = Number(id);

  if (Number.isNaN(noteId)) {
    notFound();
  }
  // DB에서 한개의 노트 가져오기
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">{note.title}</h1>

      <p className="mt-5">{note.content}</p>
    </main>
  );
}
