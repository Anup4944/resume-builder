import LoadingBtn from "@/components/LoadingBtn";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";

interface GenerateSummaryBtnProps {
  resumeDt: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryBtn({
  resumeDt,
  onSummaryGenerated,
}: GenerateSummaryBtnProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // TODO block for non premium users

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeDt);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingBtn
      variant={"outline"}
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon />
      Generate (AI)
    </LoadingBtn>
  );
}
