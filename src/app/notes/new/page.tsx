import { createNote } from "../actions";

export default function NewNotePage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">학습노트 작성</h1>

      <form action={createNote} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="block mb-2">제목</label>

          <input
            type="text"
            name="title"
            className="w-full border p-3"
            placeholder="제목을 입력하세요"
            required
            minLength={2}
          />
        </div>

        <div>
          <label className="block mb-2">내용</label>

          <textarea
            name="content"
            className="w-full border p-3"
            rows={8}
            placeholder="공부한 내용을 입력하세요"
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="border px-5 py-2">
          저장
        </button>
      </form>
    </main>
  );
}
