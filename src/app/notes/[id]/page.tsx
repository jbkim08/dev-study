import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteNote } from "../actions";

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
  //액션함수 deleteNote에 id를 먼저 입력함
  const deleteNoteWithId = deleteNote.bind(null, note.id);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">{note.title}</h1>

      <p className="mt-5">{note.content}</p>

      <Link
        href={`/notes/${note.id}/edit`}
        className="mt-6 inline-block text-blue-500"
      >
        수정하기
      </Link>

      <form action={deleteNoteWithId} className="mt-4">
        <button type="submit" className="border px-4 py-2 text-red-500">
          삭제하기
        </button>
      </form>
    </main>
  );
}
