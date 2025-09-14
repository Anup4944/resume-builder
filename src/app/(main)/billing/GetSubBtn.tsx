"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";

export default function GetSubBtn() {
  const premiumModal = usePremiumModal();
  return (
    <Button
      className="btn"
      onClick={() => premiumModal.setOpen(true)}
      variant={"premium"}
    >
      Get Premium
    </Button>
  );
}
