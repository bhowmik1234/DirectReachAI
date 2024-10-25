"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import axios from "axios";
import { Wrapper, Container } from "@/components";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionBadge from "@/components/ui/section-badge";
import { pricingCards } from "@/constants";
import { Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";




declare global {
    interface Window {
        Razorpay: any;
    }
}

interface Plan {
    id: number;
    name: string;
    amount: string;
    otherAmount: string;
    credits: Number;
    benefits: string[];
}

const PaymentPage = () => {
    const [country, setCountry] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const {data: session} = useSession();
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false); // Check if Razorpay is loaded

    useEffect(() => {
        if (typeof window !== "undefined" && window.Razorpay) {
            setRazorpayLoaded(true); 
        }
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timeZoneToCountry: { [key: string]: string } = {
          "Asia/Calcutta": "India",
        };
    
        const inferredCountry = timeZoneToCountry[timeZone] || 'Unknown';
        setCountry(inferredCountry);
    }, [session]);
    const handlePayment = async (plan: Plan) => {
        if(!session){
            signIn()
        }
        if (!razorpayLoaded) {
            alert("Razorpay is not loaded yet.");
            return;
        }
        
        setIsProcessing(true);
        setSelectedPlan(plan);

        try {
            const amount = country === "India" ? plan.amount : plan.otherAmount;
            const currency = country === "India" ? "INR" : "USD";
            const response = await axios.post("/api/create-order", { amount, currency });
            const data = response.data.order;

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
                amount: data.amount,
                currency: data.currency,
                name: "Acme Corp",
                description: `Subscription for ${plan.name}`,
                order_id: data.orderId,
                handler: async function (response: any) {
                  alert("Payment successful");
                  
                  try {
                    const addCreditResponse = await axios.post("/api/add-credit", { 
                      email: session?.user?.email, 
                      name: session?.user?.name, 
                      credit: plan.credits
                    });
                    const successDetail = addCreditResponse.data;
                    console.log("Credit added successfully:", successDetail);
                  } catch (error) {
                    console.error("Error adding credits:", error);
                  }
                },
                prefill: {
                  name: session?.user?.name,
                  email: session?.user?.email,
                },
                theme: {
                  color: "#3399cc",
                },
              };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Unable to create order");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Wrapper className="flex flex-col items-center justify-center py-12 relative">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => setRazorpayLoaded(true)} // Mark as loaded
                onError={() => console.error("Failed to load Razorpay script")}
            />
            
            <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-blue-500 rounded-full blur-[10rem] -z-10"></div>
            <Container>
                <div className="max-w-md mx-auto text-start md:text-center">
                    <SectionBadge title="Pricing" />
                    <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                        Unlock the right plan for your business
                    </h2>
                    <p className="text-muted-foreground mt-6">
                        Choose the best plan for your business and start building your
                        dream website today
                    </p>
                </div>
            </Container>
            <Container className="flex items-center justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl">
                    {pricingCards.map((card) => (
                        <Card
                            key={card.title}
                            className={cn(
                                "flex flex-col w-full border-neutral-700",
                                card.title === "Unlimited Saas" &&
                                    "border-2 border-primary"
                            )}
                        >
                            <CardHeader className="border-b border-border">
                                <span>{card.title}</span>
                                <CardTitle
                                    className={cn(
                                        card.title !== "Unlimited Saas" &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    {
                                        country === "India" ? `₹${card.amount}` : `$${card.otherAmount}`
                                    }
                                </CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-3">
                                {card.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-2"
                                    >
                                        <Zap className="w-4 h-4 fill-primary text-primary" />
                                        <p>{feature}</p>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <button
                                    onClick={() => handlePayment({
                                        id: card.id,
                                        name: card.title,
                                        amount: card.amount,
                                        otherAmount: card.otherAmount,
                                        credits: card.credit,
                                        benefits: []
                                    })}
                                    className={cn(
                                        "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                                        card.title !== "Unlimited Saas" &&
                                            "!bg-foreground !text-background"
                                    )}
                                    disabled={isProcessing}
                                >
                                    {isProcessing && selectedPlan?.id === card.id
                                        ? "Processing..."
                                        : card.buttonText}
                                </button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </Container>
        </Wrapper>
    );
};

export default PaymentPage;
