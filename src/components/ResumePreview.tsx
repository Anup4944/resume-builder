import useDimentions from "@/hooks/useDimentions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useRef } from "react";

interface ResumePreviewProps {
  resumeDt: ResumeValues;
  className?: string;
}

export default function ResumePreview({
  resumeDt,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimentions(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{ zoom: (1 / 794) * width }}
      >
        <h1 className="p-6 text-3xl font-bold">
          This text should change with the container div
        </h1>
      </div>
    </div>
  );
}
