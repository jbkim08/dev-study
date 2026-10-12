export default function NewCoursePage() {
  return (
    <main className="mx-auto max-w-2xl p-10">
      <h1 className="text-3xl font-bold">새 코스 등록</h1>

      <form className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block">코스 제목</label>

          <input
            type="text"
            name="title"
            className="w-full rounded-lg border p-3"
            placeholder="예: Next.js 기초"
            required
            minLength={2}
          />
        </div>

        <div>
          <label className="mb-2 block">코스 설명</label>

          <textarea
            name="description"
            className="w-full rounded-lg border p-3"
            rows={6}
            placeholder="코스에서 학습할 내용을 입력하세요"
            required
            minLength={5}
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          코스 등록
        </button>
      </form>
    </main>
  );
}
