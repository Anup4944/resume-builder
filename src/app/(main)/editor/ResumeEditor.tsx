"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";

export default function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeDt, setResumeDt] = useState<ResumeValues>({});
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearcParams = new URLSearchParams(searchParams);
    newSearcParams.set("step", key);
    window.history.pushState(null, "", `?${newSearcParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold"> Design your Resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.{" "}
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <BreadCrumbs currentSteps={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent resumeDt={resumeDt} setResumeDt={setResumeDt} />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeDt={resumeDt}
            setResumeDt={setResumeDt}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentSteps={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
      />
    </div>
  );
}
