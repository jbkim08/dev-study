import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateCourse } from "../../actions";

export default async function EditCoursePage({
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

  const updateCourseWithId = updateCourse.bind(null, course.id);

  return (
    <main className="mx-auto max-w-2xl p-10">
      <h1 className="text-3xl font-bold">코스 수정</h1>

      <form action={updateCourseWithId} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block">코스 제목</label>

          <input
            type="text"
            name="title"
            defaultValue={course.title}
            className="w-full rounded-lg border p-3"
            required
            minLength={2}
          />
        </div>

        <div>
          <label className="mb-2 block">코스 설명</label>

          <textarea
            name="description"
            defaultValue={course.description}
            className="w-full rounded-lg border p-3"
            rows={6}
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
