"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { access } from "fs";
import path from "path";
import { del, put } from "vercel/blob";

export async function saveResume(values: ResumeValues) {
  const { id } = values;
  console.log("recieved dt", values);

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // to-do: check resume count for non-premium users

  const exisitingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !exisitingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;
  if (photo instanceof File) {
    if (exisitingResume?.photoUrl) {
      await del(exisitingResume.photoUrl);
    }
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
  }
}
