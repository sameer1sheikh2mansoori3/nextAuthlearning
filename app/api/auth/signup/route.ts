
import { User } from "@/app/lib/user.model";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/database"; 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
connectToDatabase();
// POST handler for signup
export async function POST(req: Request) {


  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Create and save the user
    const user = new User({ email, password });
    await user.save();
    // return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
  
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    } else if (typeof error === "object" && error !== null && "message" in error && "status" in error) {
     
      const typedError = error as { message: string; status: number };
      return NextResponse.json(
        { error: typedError.message },
        { status: typedError.status || 500 }
      );
    } else {
  
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  
}
