import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function NewLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const courseId = Number(id);

  if (Number.isNaN(courseId)) {
    notFound();
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-10">
      <p className="text-sm text-gray-500">{course.title}</p>

      <h1 className="mt-2 text-3xl font-bold">새 Lesson 등록</h1>

      <form className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block">Lesson 제목</label>

          <input
            type="text"
            name="title"
            className="w-full rounded-lg border p-3"
            placeholder="예: Route Handler 이해하기"
            required
            minLength={2}
          />
        </div>

        <div>
          <label className="mb-2 block">학습 내용</label>

          <textarea
            name="content"
            className="w-full rounded-lg border p-3"
            rows={8}
            placeholder="Lesson에서 학습할 내용을 입력하세요"
            required
            minLength={5}
          />
        </div>

        <button
          type="button"
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Lesson 등록
        </button>
      </form>
    </main>
  );
}
