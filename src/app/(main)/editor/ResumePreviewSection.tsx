import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import ColorPicker from "./ColorPicker";
import BorderStyleBtn from "./BorderStyleBtn";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
  resumeDt: ResumeValues;
  setResumeDt: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeDt,
  setResumeDt,
  className,
}: ResumePreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeDt.colorHex}
          onChange={(color) =>
            setResumeDt({ ...resumeDt, colorHex: color.hex })
          }
        />
        <BorderStyleBtn
          borderStyle={resumeDt.borderStyle}
          onChange={(borderStyle) => setResumeDt({ ...resumeDt, borderStyle })}
        />
      </div>
      <div className="flex w-full overflow-y-auto bg-secondary p-3">
        <ResumePreview resumeDt={resumeDt} className="max-w-2xl shadow-md" />
      </div>
    </div>
  );
}
