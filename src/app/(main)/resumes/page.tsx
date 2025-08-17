import prisma from "@/lib/prisma";
import { resumeDtInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeItem from "./ResumeItem";
import CreateResumeBtn from "./CreateResumeBtn";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDtInclude,
    }),
    prisma.resume.count({
      where: { userId },
    }),
  ]);

  //TODO: Check quato for non-premium users

  return (
    <main className="max-w-7x1 mx-auto w-full space-y-6 px-3 py-6">
      <CreateResumeBtn canCreate={totalCount < 3} />
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes ({totalCount})</h1>
      </div>
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem resume={resume} key={resume.id} />
        ))}
      </div>
    </main>
  );
}
