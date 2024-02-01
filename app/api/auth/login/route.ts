import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";

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
        if (!existingUser) {
            return NextResponse.json(
                { error: "unvalid email or password" },
                { status: 400 }
            );
        }
        const passMatch = bcrypt.compare(password, existingUser.password);
        if (!passMatch) {
            return NextResponse.json(
                { error: "unvalid email or password" },
                { status: 400 }
            );
        }
        const token = jwt.sign(
            { userId: existingUser.id },
            process.env.JWT_KEY
        );
        return NextResponse.json(
            {
                token: token,
            },
            {
                status: 200,
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
