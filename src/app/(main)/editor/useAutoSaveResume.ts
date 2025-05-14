import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useEffect, useState } from "react";

export default function useAutoSaveResume(resumeDt: ResumeValues) {
  const debouncedResumeDt = useDebounce(resumeDt, 1500);
  const [lastSavedDt, setLastSavedDt] = useState(structuredClone(resumeDt));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function save() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSavedDt(structuredClone(debouncedResumeDt));
      setIsSaving(false);
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeDt) !== JSON.stringify(lastSavedDt);

    if (hasUnsavedChanges && debouncedResumeDt && !isSaving) {
      save();
    }
  }, [debouncedResumeDt, isSaving, lastSavedDt]);

  return {
    isSaving,
    hasUnsavedChanges: JSON.stringify(resumeDt) !== JSON.stringify(lastSavedDt),
  };
}
