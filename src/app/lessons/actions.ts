"use server";
//서버환경에서 동작하는 비동기 함수만 사용 (컴포넌트 X)
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//completed를 true로 업데이트
export async function completeLesson(
  id: number,
  courseId: number,
  _formData: FormData,
) {
  await prisma.lesson.update({
    where: {
      id,
    },
    data: {
      completed: true,
    },
  });

  revalidatePath(`/lessons/${id}`);
  revalidatePath(`/courses/${courseId}`);
}
