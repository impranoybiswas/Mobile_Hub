import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$/;

export async function POST(req: Request) {
  try {
    const { name, email, password, photoUrl } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "সব ফিল্ড পূরণ করুন" }, { status: 400 });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর এবং এতে বড় হাতের, ছোট হাতের অক্ষর ও সংখ্যা থাকতে হবে" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ message: "এই ইমেইল আগে থেকে রেজিস্টার্ড" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      photoUrl: photoUrl || null,
      createdAt: new Date(),
      role: "user",
    };

    const result = await users.insertOne(newUser);

    return NextResponse.json(
      {
        user: {
          id: result.insertedId,
          name: newUser.name,
          email: newUser.email,
          photoUrl: newUser.photoUrl,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "সার্ভার সমস্যা" }, { status: 500 });
  }
}
