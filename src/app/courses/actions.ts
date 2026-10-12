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
