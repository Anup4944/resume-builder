import LoadingBtn from "@/components/LoadingBtn";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAiTools } from "@/lib/permission";

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

  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  async function handleClick() {
    if (!canUseAiTools(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }
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
