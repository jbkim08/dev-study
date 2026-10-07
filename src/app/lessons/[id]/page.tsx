import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lessonId = Number(id);

  if (Number.isNaN(lessonId)) {
    notFound();
  }

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
  });

  if (!lesson) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-10">
      <p className="text-sm text-gray-500">Lesson {lesson.position}</p>

      <h1 className="mt-2 text-3xl font-bold">{lesson.title}</h1>

      <Link
        href={`/courses/${lesson.courseId}`}
        className="mt-8 inline-block text-blue-500"
      >
        코스로 돌아가기
      </Link>
    </main>
  );
}
