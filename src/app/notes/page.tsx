import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const keyword = q.trim();

  const notes = await prisma.note.findMany({
    where: keyword
      ? {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: {
      id: "asc",
    },
  });
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">학습노트</h1>
      <form action="/notes" method="get" className="mt-5 flex gap-2">
        <input
          type="text"
          name="q"
          placeholder="제목 검색"
          className="border p-2"
        />

        <button type="submit" className="border px-4 py-2">
          검색
        </button>
      </form>

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
