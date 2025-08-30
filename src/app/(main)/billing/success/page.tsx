import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">Billing Successful</h1>
      <p>Your payment has been processed successfully.</p>
      <Button asChild>
        <Link href="/resumes">Go to resume builder</Link>
      </Button>
    </main>
  );
}
