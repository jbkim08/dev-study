import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const noteCount = await prisma.note.count();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">대시보드</h1>

      <div className="mt-6 max-w-sm rounded-lg border p-5">
        <p className="text-gray-500">전체 학습노트</p>

        <p className="mt-2 text-3xl font-bold">{noteCount}</p>
      </div>

      <Link href="/notes" className="mt-6 inline-block text-blue-500">
        학습노트 보러가기
      </Link>
    </main>
  );
}
