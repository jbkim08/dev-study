import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = "", page = "1" } = await searchParams;
  const keyword = q.trim();
  const requestedPage = Math.max(Number(page) || 1, 1);
  const pageSize = 5; //한페이지 5개
  //전체 게시글 개수 구하기
  const totalCount = await prisma.note.count({
    where: keyword
      ? {
          OR: [
            {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,
  });
  const totalPages = Math.max(Math.ceil(totalCount / pageSize));
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  //최종 페이지는 총페이지보다 크지 않게
  const currentPage = Math.min(requestedPage, totalPages);
  const skip = (currentPage - 1) * pageSize;

  const notes = await prisma.note.findMany({
    where: keyword
      ? {
          OR: [
            {
              title: {
                contains: keyword,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: keyword,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: pageSize,
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
      {/* 노트 목록 */}
      <div className="mt-6 space-y-3">
        {notes.length === 0 ? (
          <div className="border p-4">
            <p>검색 결과가 없습니다.</p>

            <Link href="/notes" className="mt-3 inline-block text-blue-500">
              전체 목록 보기
            </Link>
          </div>
        ) : (
          notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="block border p-4"
            >
              <h2 className="font-bold">{note.title}</h2>

              <p className="mt-2 text-sm text-gray-500">
                {note.createdAt.toLocaleDateString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
              </p>
            </Link>
          ))
        )}
      </div>
      {/* 이전 다음 버튼 */}
      <div className="mt-6 flex items-center gap-4">
        {currentPage > 1 && (
          <Link
            href={`/notes?page=${currentPage - 1}&q=${encodeURIComponent(q)}`}
            className="border px-4 py-2"
          >
            이전
          </Link>
        )}

        {pages.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={`/notes?page=${pageNumber}&q=${encodeURIComponent(q)}`}
            className="border px-3 py-2"
          >
            {pageNumber}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={`/notes?page=${currentPage + 1}&q=${encodeURIComponent(q)}`}
            className="border px-4 py-2"
          >
            다음
          </Link>
        )}
      </div>
    </main>
  );
}
