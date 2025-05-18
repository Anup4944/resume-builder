import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeDt: ResumeValues;
  setResumeDt: (data: ResumeValues) => void;
}

export const resumeDtInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerDt = Prisma.ResumeGetPayload<{
  include: typeof resumeDtInclude;
}>;
