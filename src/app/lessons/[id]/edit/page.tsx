import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateLesson } from "../../actions";

export default async function EditLessonPage({
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

  const updateLessonWithId = updateLesson.bind(
    null,
    lesson.id,
    lesson.courseId,
  );

  return (
    <main className="mx-auto max-w-2xl p-10">
      <p className="text-sm text-gray-500">Lesson {lesson.position}</p>

      <h1 className="mt-2 text-3xl font-bold">Lesson 수정</h1>

      <form action={updateLessonWithId} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block">Lesson 제목</label>

          <input
            type="text"
            name="title"
            defaultValue={lesson.title}
            className="w-full rounded-lg border p-3"
            required
            minLength={2}
          />
        </div>

        <div>
          <label className="mb-2 block">학습 내용</label>

          <textarea
            name="content"
            defaultValue={lesson.content}
            className="w-full rounded-lg border p-3"
            rows={8}
            required
            minLength={5}
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          수정 저장
        </button>
      </form>
    </main>
  );
}
