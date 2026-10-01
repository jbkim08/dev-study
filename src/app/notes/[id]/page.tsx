export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">학습노트 상세</h1>

      <p className="mt-5">노트 번호: {id}</p>
    </main>
  );
}
