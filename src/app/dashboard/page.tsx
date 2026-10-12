import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const noteCount = await prisma.note.count();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentCount = await prisma.note.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
  });

  const recentNotes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const courseCount = await prisma.course.count();
  const lessonCount = await prisma.lesson.count();
  const completedLessonCount = await prisma.lesson.count({
    where: {
      completed: true,
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">대시보드</h1>

        <Link
          href="/notes/new"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          새 노트 작성
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-5">
          <p className="text-gray-500">전체 학습노트</p>

          <p className="mt-2 text-3xl font-bold">{noteCount}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-gray-500">최근 7일 작성</p>

          <p className="mt-2 text-3xl font-bold">{recentCount}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-gray-500">전체 코스</p>

          <p className="mt-2 text-3xl font-bold">{courseCount}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-gray-500">완료 Lesson</p>

          <p className="mt-2 text-3xl font-bold">{completedLessonCount}</p>

          <p className="mt-1 text-sm text-gray-500">전체 {lessonCount}개</p>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">최근 학습노트</h2>

          <Link href="/notes" className="text-sm text-blue-500">
            전체 보기
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {recentNotes.length === 0 ? (
            <p className="rounded-lg border p-5 text-gray-500">
              아직 작성한 학습노트가 없습니다.
            </p>
          ) : (
            recentNotes.map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className="block rounded-lg border p-5 hover:bg-gray-50"
              >
                <h3 className="font-bold">{note.title}</h3>

                <p className="mt-2 text-sm text-gray-500">
                  {note.createdAt.toLocaleDateString("ko-KR", {
                    timeZone: "Asia/Seoul",
                  })}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
