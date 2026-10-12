import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { completeLesson, uncompleteLesson, deleteLesson } from "../actions";

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

  const completeLessonWithId = completeLesson.bind(
    null,
    lesson.id,
    lesson.courseId,
  );

  const uncompleteLessonWithId = uncompleteLesson.bind(
    null,
    lesson.id,
    lesson.courseId,
  );

  const deleteLessonWithId = deleteLesson.bind(
    null,
    lesson.id,
    lesson.courseId,
  );

  return (
    <main className="mx-auto max-w-4xl p-10">
      <p className="text-sm text-gray-500">Lesson {lesson.position}</p>

      <h1 className="mt-2 text-3xl font-bold">{lesson.title}</h1>

      <div className="mt-8 rounded-lg border p-6">
        <p className="whitespace-pre-wrap leading-7 text-gray-700">
          {lesson.content}
        </p>
      </div>

      <Link
        href={`/lessons/${lesson.id}/edit`}
        className="mt-6 inline-block text-blue-500"
      >
        Lesson 수정하기
      </Link>

      {lesson.completed ? (
        <div className="mt-6">
          <p className="rounded-lg bg-gray-100 p-4">✅ 학습 완료</p>

          <form action={uncompleteLessonWithId} className="mt-3">
            <button type="submit" className="rounded-lg border px-5 py-2">
              완료 취소
            </button>
          </form>
        </div>
      ) : (
        <form action={completeLessonWithId} className="mt-6">
          <button
            type="submit"
            className="rounded-lg bg-black px-5 py-2 text-white"
          >
            학습 완료
          </button>
        </form>
      )}

      <form action={deleteLessonWithId} className="mt-4">
        <button
          type="submit"
          className="rounded-lg border px-4 py-2 text-red-500"
        >
          Lesson 삭제
        </button>
      </form>

      <Link
        href={`/courses/${lesson.courseId}`}
        className="mt-8 inline-block text-blue-500"
      >
        코스로 돌아가기
      </Link>
    </main>
  );
}
