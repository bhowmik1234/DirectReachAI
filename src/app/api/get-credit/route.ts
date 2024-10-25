import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {

      const { email, name } = await req.json();
      if (!email || !name) {
        return NextResponse.json({message: "Email and name can't be empty"}, { status: 500 });

      }
      console.log('hello', email)
      let user= null;
      user = await prisma.user.findUnique({
        where: {
          email: email
        },
      }); 
      
      
      return NextResponse.json(user, { status: 200 }); 
    } catch (error: any) {
      console.error("Error fetching users:", error);
  
      return NextResponse.json({ error: "Unable to fetch users", message: error.message }, { status: 500 });
    }
  }