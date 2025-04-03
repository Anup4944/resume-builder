import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design your resumes",
};

export default function Page() {
  return <ResumeEditor />;
}
