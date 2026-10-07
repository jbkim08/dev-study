import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const courseId = Number(id);

  if (Number.isNaN(courseId)) {
    notFound();
  }
  //유니크 id를 검색한 결과
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      lessons: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="text-3xl font-bold">{course.title}</h1>

      <p className="mt-5 text-gray-600">{course.description}</p>

      <section className="mt-10">
        <h2 className="text-xl font-bold">학습 순서</h2>

        <div className="mt-4 space-y-3">
          {course.lessons.length === 0 ? (
            <p className="rounded-lg border p-4 text-gray-500">
              아직 등록된 Lesson이 없습니다.
            </p>
          ) : (
            course.lessons.map((lesson) => (
              <div key={lesson.id} className="rounded-lg border p-4">
                <p className="text-sm text-gray-500">
                  Lesson {lesson.position}
                </p>

                <h3 className="mt-1 font-bold">{lesson.title}</h3>
              </div>
            ))
          )}
        </div>
      </section>

      <Link href="/courses" className="mt-6 inline-block text-blue-500">
        코스 목록으로 돌아가기
      </Link>
    </main>
  );
}
