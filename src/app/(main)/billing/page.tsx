import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Stripe from "stripe";
import GetSubBtn from "./GetSubBtn";
import ManageSubBtn from "./ManageSubBtn";
import { formatDate } from "date-fns";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free Plan"}
        </span>
      </p>
      {/* */}

      {subscription ? (
        <>
          {/* <ManageSubBtn /> */}
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will end on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd yyyy")}{" "}
            </p>
          )}
          <ManageSubBtn />
        </>
      ) : (
        <GetSubBtn />
      )}
    </main>
  );
}
