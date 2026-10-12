"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCourse(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();

  const description = String(formData.get("description") ?? "").trim();

  if (!title || !description) {
    return;
  }

  const course = await prisma.course.create({
    data: {
      title,
      description,
    },
  });

  revalidatePath("/courses");
  redirect(`/courses/${course.id}`);
}

export async function updateCourse(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();

  const description = String(formData.get("description") ?? "").trim();

  if (!title || !description) {
    return;
  }

  await prisma.course.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });

  revalidatePath("/courses");
  revalidatePath(`/courses/${id}`);

  redirect(`/courses/${id}`);
}

export async function deleteCourse(id: number) {
  // $transaction 안의 DB수정,삭제,추가가 하나라도 문제발생하면 => 롤백
  await prisma.$transaction([
    prisma.lesson.deleteMany({
      where: {
        courseId: id,
      },
    }),

    prisma.course.delete({
      where: {
        id,
      },
    }),
  ]);

  revalidatePath("/courses");
  revalidatePath("/dashboard");

  redirect("/courses");
}
