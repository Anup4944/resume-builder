import useDimentions from "@/hooks/useDimentions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";

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
        <PersonalInfoHeader resumeDt={resumeDt} />
        <SummarySection resumeDt={resumeDt} />
        <WorkExpSection resumeDt={resumeDt} />
        <EducationSection resumeDt={resumeDt} />
        <SkillsSection resumeDt={resumeDt} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeDt: ResumeValues;
}

function PersonalInfoHeader({ resumeDt }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email } =
    resumeDt;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-grey-500 text-xs">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? "  •  " : ""}
          {[phone, email].filter(Boolean).join("  •  ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeDt }: ResumeSectionProps) {
  const { summary } = resumeDt;
  if (!summary) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold"></p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExpSection({ resumeDt }: ResumeSectionProps) {
  const { workExperiences } = resumeDt;

  const workExpNotEmpty = workExperiences?.filter(
    (w) => Object.values(w).filter(Boolean).length > 0,
  );

  if (!workExpNotEmpty?.length) return null;
  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold"> Work experiences</p>
        {workExpNotEmpty.map((work, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{work.position}</span>
              {work.startDate && (
                <span>
                  {formatDate(work.startDate, "MM/yyyy")} -{" "}
                  {work.endDate
                    ? formatDate(work.endDate, "MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{work.company}</p>
            <div className="whitespace-pre-line text-sm">
              {work.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeDt }: ResumeSectionProps) {
  const { educations } = resumeDt;

  const eduNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!eduNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Educations </p>
        {eduNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}
function SkillsSection({ resumeDt }: ResumeSectionProps) {
  const { skills } = resumeDt;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Skills </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
