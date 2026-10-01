import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">About</h1>

      <p className="mt-3">DevStudy 소개 페이지입니다.</p>

      <Link href="/" className="mt-5 inline-block text-blue-500">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
