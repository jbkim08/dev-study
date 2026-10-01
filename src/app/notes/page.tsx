import Link from "next/link";

export default function NotesPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">학습노트</h1>

      <div className="mt-6 space-y-3">
        <Link href="/notes/1" className="block border p-4">
          JavaScript 복습
        </Link>

        <Link href="/notes/2" className="block border p-4">
          React 정리
        </Link>

        <Link href="/notes/3" className="block border p-4">
          Next.js 공부
        </Link>
      </div>
    </main>
  );
}
