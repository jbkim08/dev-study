import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="text-3xl font-bold">학습 코스</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="block rounded-lg border p-5 hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold">{course.title}</h2>

            <p className="mt-3 text-gray-600">{course.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
