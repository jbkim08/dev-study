import Link from "next/link";
import { notes } from "@/data/notes";

export default function NotesPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">학습노트</h1>

      <div className="mt-6 space-y-3">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="block border p-4"
          >
            {note.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
