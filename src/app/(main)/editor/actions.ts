"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import path from "path";
import { del, put } from "@vercel/blob";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume, canUseCustomizations } from "@/lib/permission";

export async function saveResume(values: ResumeValues) {
  const { id } = values;
  // console.log("recieved dt", values);

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!id) {
    const resumeCount = await prisma.resume.count({
      where: { userId },
    });
    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Resume creation limit reached. Please upgrade your subscription.",
      );
    }
  }
  const exisitingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !exisitingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomization =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== exisitingResume?.borderStyle) ||
    (resumeValues.colorHex &&
      resumeValues.colorHex !== exisitingResume?.colorHex);

  if (hasCustomization && !canUseCustomizations(subscriptionLevel)) {
    throw new Error(
      "Customizations are available for Pro Plus users only. Please upgrade your subscription.",
    );
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
    if (exisitingResume?.photoUrl) {
      await del(exisitingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: {
        id,
      },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
