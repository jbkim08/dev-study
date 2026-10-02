import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function NotesPage() {
  const notes = await prisma.note.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">학습노트</h1>

      <Link href="/notes/new" className="mt-4 inline-block border px-4 py-2">
        새 노트 작성
      </Link>

      <div className="mt-6 space-y-3">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="block border p-4"
          >
            {note.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
