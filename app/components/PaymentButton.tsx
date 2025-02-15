"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
// Define types for props
interface PaymentButtonProps {
  amount: number;
  title:string;
}
const PaymentButton: React.FC<PaymentButtonProps> = ({ amount,title }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  // Load Razorpay script
  useEffect(() => {
    const loadScript = () => {
      if (document.getElementById("razorpay-script")) return;
      
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay script");
      
      document.body.appendChild(script);
    };
    loadScript();
  }, []);
  const makePayment = async () => {
    if (!razorpayLoaded) {
      alert("Payment system is still loading. Please try again in a few seconds.");
      return;
    }
    setIsLoading(true);
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID; // Use NEXT_PUBLIC for env variables in frontend
    const response = await fetch(`/api/order/create?amount=${amount}`);
    const { order } = await response.json();
    const options = {
      key: key,
      name: session?.user?.email ?? "",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
      handler: async function (response: any) {
        const res = await fetch("/api/order/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email: session?.user?.email ?? "",
          }),
        });
        const result = await res.json();
        if (!result?.error) {
          await fetch("/api/order/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: order.id,
              paymentId: response.razorpay_payment_id,
              email: session?.user?.email,
              amount: order.amount,
            }),
          });

          router.push("/success");
        } else {
          console.error("Error verifying payment:", result.message);
        }
      },
      prefill: {
        email: session?.user?.email ?? "",
      },
    };

    // Ensure Razorpay is available before calling new Razorpay()
    if (typeof (window as any).Razorpay !== "undefined") {
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", () => {
        alert("Payment failed. Please try again.");
        setIsLoading(false);
      });
    } else {
      alert("Failed to load Razorpay. Please refresh the page.");
      setIsLoading(false);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="m-4">
      <button
  className="relative group/btn flex space-x-2 items-center justify-start px-4 w-max text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
  type="submit"
  disabled={isLoading}
  onClick={makePayment}
>
  {isLoading ? "Processing..." : title}
</button>

      </div>
    </Suspense>
  );
};

export default PaymentButton;
