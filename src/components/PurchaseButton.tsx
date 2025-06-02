"use client";

import React, { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PurchaseButton = ({ courseId }: { courseId: Id<"courses"> }) => {
  const { user } = useUser();
  const userData = useQuery(
    api.users.getUserByClerkId,
    user
      ? {
          clerkId: user?.id,
        }
      : "skip"
  );
  const [isLoading, setIsLoading] = useState(false);
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);

  const userAccess = useQuery(
    api.users.getUserAccess,
    userData
      ? {
          userId: userData?._id,
          courseId,
        }
      : "skip"
  ) || { hasAccess: false };

  const handlePurchase = async () => {
    if (!user) {
      return toast.error("Please login to purchase!");
    }

    setIsLoading(true);
    try {
      const { checkoutUrl } = await createCheckoutSession({ courseId });
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error: any) {
      if (error.message.includes("Rate limit exceeded")) {
        toast.error("You've tried too many times. Please try again later!");
      } else {
        toast.error(error.message || "Something went wrong. Try again later");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userAccess.hasAccess) {
    return (
      <Button variant={"outline"} onClick={handlePurchase} disabled={isLoading}>
        Enroll Now
      </Button>
    );
  }

  if (userAccess.hasAccess) {
    return <Button variant={"outline"}>Enrolled</Button>;
  }

  if (isLoading) {
    return (
      <Button variant={"outline"}>
        <Loader2 className="mr-2 size-4 animate-spin" />
        Processing
      </Button>
    );
  }

  return <div>PurchaseButton</div>;
};

export default PurchaseButton;
