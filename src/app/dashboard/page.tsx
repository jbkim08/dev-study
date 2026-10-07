import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const noteCount = await prisma.note.count();
  const recentNotes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  const sevenDaysAgo = new Date(); //오늘 날짜
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); //7일전 날짜
  const recentCount = await prisma.note.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
  });
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">대시보드</h1>

      <div className="mt-6 max-w-sm rounded-lg border p-5">
        <p className="text-gray-500">전체 학습노트</p>

        <p className="mt-2 text-3xl font-bold">{noteCount}</p>
      </div>

      <div className="mt-6 max-w-sm rounded-lg border p-5">
        <p className="text-gray-500">최근 7일 작성</p>

        <p className="mt-2 text-3xl font-bold">{recentCount}</p>
      </div>

      <Link href="/notes" className="mt-6 inline-block text-blue-500">
        학습노트 보러가기
      </Link>

      <section className="mt-8 max-w-2xl">
        <h2 className="text-xl font-bold">최근 학습노트</h2>

        <div className="mt-4 space-y-3">
          {recentNotes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="block rounded-lg border p-4"
            >
              <p className="font-bold">{note.title}</p>

              <p className="mt-2 text-sm text-gray-500">
                {note.createdAt.toLocaleDateString("ko-KR", {
                  timeZone: "Asia/Seoul",
                })}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
