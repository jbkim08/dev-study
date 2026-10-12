"use server";
//서버환경에서 동작하는 비동기 함수만 사용 (컴포넌트 X)
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

//completed를 false로 업데이트
export async function uncompleteLesson(
  id: number,
  courseId: number,
  _formData: FormData,
) {
  await prisma.lesson.update({
    where: {
      id,
    },
    data: {
      completed: false,
    },
  });

  revalidatePath(`/lessons/${id}`);
  revalidatePath(`/courses/${courseId}`);
}

export async function updateLesson(
  id: number,
  courseId: number,
  formData: FormData,
) {
  const title = String(formData.get("title") ?? "").trim();

  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) {
    return;
  }

  await prisma.lesson.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });

  revalidatePath(`/lessons/${id}`);
  revalidatePath(`/courses/${courseId}`);

  redirect(`/lessons/${id}`);
}

export async function deleteLesson(id: number, courseId: number) {
  await prisma.lesson.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/courses/${courseId}`);
  revalidatePath("/courses");
  revalidatePath("/dashboard");

  redirect(`/courses/${courseId}`);
}
