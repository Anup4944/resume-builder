"use client";

import LoadingBtn from "@/components/LoadingBtn";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCustomerPortalSession } from "./actions";

export default function ManageSubBtn() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <LoadingBtn onClick={handleClick} loading={loading}>
      Manage Subscription
    </LoadingBtn>
  );
}
