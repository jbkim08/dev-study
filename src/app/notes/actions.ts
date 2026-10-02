"use server"; //서버환경에서 동작하는 비동기 함수만 사용 (컴포넌트 X)

import prisma from "@/lib/prisma";

//[서버액션함수] 새 노트 작성(폼데이터 입력)
export async function createNote(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.note.create({
    data: {
      title,
      content,
    },
  });
}
