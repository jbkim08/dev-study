"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">문제가 발생했습니다.</h1>

      <p className="mt-3 text-gray-600">학습노트를 불러오지 못했습니다.</p>

      <button onClick={() => reset()} className="mt-5 border px-4 py-2">
        다시 시도
      </button>
    </main>
  );
}
