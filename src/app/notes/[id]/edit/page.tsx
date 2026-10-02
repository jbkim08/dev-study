import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateNote } from "../../actions";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const noteId = Number(id);

  if (Number.isNaN(noteId)) {
    notFound();
  }

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!note) {
    notFound();
  }
  // id를 먼저 입력함(바인딩한 함수 formData만 입력함)
  const updateNoteWithId = updateNote.bind(null, note.id);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">학습노트 수정</h1>

      <form action={updateNoteWithId} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="mb-2 block">제목</label>

          <input
            type="text"
            name="title"
            defaultValue={note.title}
            className="w-full border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">내용</label>

          <textarea
            name="content"
            defaultValue={note.content}
            className="w-full border p-3"
            rows={8}
          />
        </div>

        <button type="submit" className="border px-5 py-2">
          수정 저장
        </button>
      </form>
    </main>
  );
}
