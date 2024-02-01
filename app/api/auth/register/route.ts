import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

type Response = {
    email: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const { email, password } = (await request.json()) as Response;
        const existingUser = await prismadb.user.findFirst({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }
        const hashedPass = await bcrypt.hash(password, 14);
        const newUser = await prismadb.user.create({
            data: {
                email: email,
                password: hashedPass,
            },
        });
        return NextResponse.json(
            {
                data: {
                    id: newUser.id,
                    email: newUser.email,
                    created_at: newUser.createdAt,
                    updated_at: newUser.updated_at,
                },
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error,
            },
            {
                status: 500,
            }
        );
    }
}
