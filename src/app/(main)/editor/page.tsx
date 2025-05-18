import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDtInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "Design your resumes",
};

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDtInclude,
      })
    : null;
  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
