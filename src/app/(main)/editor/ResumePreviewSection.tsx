import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeDt: ResumeValues;
  setResumeDt: (data: ResumeValues) => void;
}

export default function ResumePreviewSection({
  resumeDt,
  setResumeDt,
}: ResumePreviewSectionProps) {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex w-full overflow-y-auto bg-secondary p-3">
        <ResumePreview resumeDt={resumeDt} className="max-w-2xl shadow-md" />
      </div>
    </div>
  );
}
