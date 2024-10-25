import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, name, credit } = await req.json();

        if (!email || !name || !credit) {
            return NextResponse.json(
                { message: "Email and name can't be empty" },
                { status: 500 }
            );
        }

        console.log("hello", email);
        let user = null;
        user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            user = await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    credits: {
                        increment: credit,
                    }
                },
            });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching users:", error);

        // Return a 500 error response using NextResponse
        return NextResponse.json(
            { error: "Unable to fetch users", message: error.message },
            { status: 500 }
        );
    }
}
