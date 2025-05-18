import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveResume(resumeDt: ResumeValues) {
  const serachParams = useSearchParams();
  const { toast } = useToast();
  const debouncedResumeDt = useDebounce(resumeDt, 1500);
  const [resumeId, setResumeId] = useState(resumeDt.id);
  const [lastSavedDt, setLastSavedDt] = useState(structuredClone(resumeDt));
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeDt]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);
        const newDt = structuredClone(debouncedResumeDt);

        const updatedResume = await saveResume({
          ...newDt,
          ...(JSON.stringify(lastSavedDt.photo, fileReplacer) ===
            JSON.stringify(newDt.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedDt(newDt);
        if (serachParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(serachParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeDt, fileReplacer) !==
      JSON.stringify(lastSavedDt, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeDt && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeDt,
    isSaving,
    lastSavedDt,
    isError,
    resumeId,
    serachParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges: JSON.stringify(resumeDt) !== JSON.stringify(lastSavedDt),
  };
}
