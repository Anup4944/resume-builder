import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  resumeDt: ResumeValues;
  setResumeDt: (data: ResumeValues) => void;
}

export default function ResumePreviewSection({
  resumeDt,
  setResumeDt,
}: ResumePreviewSectionProps) {
  return (
    <div className="relative hidden w-1/2 md:flex">
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeDt.colorHex}
          onChange={(color) =>
            setResumeDt({ ...resumeDt, colorHex: color.hex })
          }
        />
      </div>
      <div className="flex w-full overflow-y-auto bg-secondary p-3">
        <ResumePreview resumeDt={resumeDt} className="max-w-2xl shadow-md" />
      </div>
    </div>
  );
}
