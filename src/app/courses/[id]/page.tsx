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
  });

  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="text-3xl font-bold">{course.title}</h1>

      <p className="mt-5 text-gray-600">{course.description}</p>

      <Link href="/courses" className="mt-6 inline-block text-blue-500">
        코스 목록으로 돌아가기
      </Link>
    </main>
  );
}
