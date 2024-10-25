import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        let { amount, currency } = await req.json();
        if (!amount) {
            return NextResponse.json({ message: "Amount can't be empty" }, { status: 500 });
        }
        amount = Number(amount)
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: currency,
            receipt: "order_rcptid_11",
        });
        console.log("Order created:", order);
        return NextResponse.json({order}, { status: 200 });
    } catch (error: any) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Unable to create order", message: error.message }, { status: 500 });
    }
}