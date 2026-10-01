import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">404</h1>

      <p className="mt-3">학습노트를 찾을 수 없습니다.</p>

      <Link href="/notes" className="mt-5 inline-block text-blue-500">
        학습노트 목록으로 돌아가기
      </Link>
    </main>
  );
}
