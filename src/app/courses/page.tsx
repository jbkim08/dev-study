import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      lessons: {
        select: {
          completed: true,
        },
      },
    },
  });

  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="text-3xl font-bold">학습 코스</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {courses.map((course) => {
          const totalLessons = course.lessons.length;

          const completedLessons = course.lessons.filter(
            (lesson) => lesson.completed,
          ).length;

          const progress =
            totalLessons === 0
              ? 0
              : Math.round((completedLessons / totalLessons) * 100);

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="block rounded-lg border p-5 hover:bg-gray-50"
            >
              <h2 className="text-xl font-bold">{course.title}</h2>

              <p className="mt-3 text-gray-600">{course.description}</p>

              <div className="mt-5">
                <div className="flex justify-between text-sm">
                  <span>학습 진행률</span>
                  <span>{progress}%</span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-black"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {completedLessons} / {totalLessons} 완료
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
