import { notes } from "@/data/notes";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //노트데이터에서 id가 같은 노트를 찾음
  const note = notes.find((note) => note.id === Number(id));
  //노트가 없는 경우
  if (!note) {
    return <main className="p-10">노트를 찾을 수 없습니다.</main>;
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">{note.title}</h1>

      <p className="mt-5">{note.content}</p>
    </main>
  );
}
