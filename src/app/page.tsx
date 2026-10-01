import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">DevStudy</h1>

      <p className="mt-3">개발 공부를 기록하는 학습 관리 서비스</p>

      <Link href="/about" className="mt-5 inline-block text-blue-500">
        About 페이지로 이동
      </Link>
    </main>
  );
}
