import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { hash } from "bcrypt";

type RegisterUserRequest = {
    email: string;
    name: string;
    password: string;
};

export async function POST(req: Request) {
    try {

        const body: RegisterUserRequest = await req.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return NextResponse.json(
                { message: "Email, name, and password are required." },
                { status: 400 }
            );
        }

        const userExistsByEmail = await db.user.findUnique({
            where: { email },
        });

        if (userExistsByEmail) {
            return NextResponse.json(
                { message: "User with this email already exists." },
                { status: 409 }
            );
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json(
            { user: rest, message: "User created successfully." },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error." },
            { status: 500 }
        );
    }
}
