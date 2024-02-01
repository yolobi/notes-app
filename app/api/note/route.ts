import prismadb from "@/lib/prisma";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

interface CreateRequest {
    title: string;
    content: string;
    user_id: number;
}

export async function POST(request: Request) {
    try {
        const authorization = request.headers.get("authorization");
        const splitted = authorization?.split(" ");
        const token = splitted?.at(1);
        if (!token) {
            return NextResponse.json(
                {
                    message: "invalid token",
                },
                {
                    status: 400,
                }
            );
        }

        const jwt = jwtDecode(token);
        const userId = jwt.userId;
        const user = await prismadb.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return NextResponse.json(
                {
                    message: "invalid token",
                },
                {
                    status: 400,
                }
            );
        }

        const { title, content } = (await request.json()) as CreateRequest;
        const newNote = await prismadb.note.create({
            data: {
                userId: userId,
                title: title,
                content: content,
            },
        });

        return NextResponse.json({
            data: newNote,
        });
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

export async function GET(request: Request) {
    try {
        const authorization = request.headers.get("authorization");
        const splitted = authorization?.split(" ");
        const token = splitted?.at(1);
        if (!token) {
            return NextResponse.json(
                {
                    message: "invalid token",
                },
                {
                    status: 400,
                }
            );
        }

        const jwt = jwtDecode(token);
        const userId = jwt.userId;
        const user = await prismadb.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return NextResponse.json(
                {
                    message: "invalid token",
                },
                {
                    status: 400,
                }
            );
        }

        const notes = await prismadb.note.findMany({
            where: {
                userId: userId,
            },
        });
        return NextResponse.json({
            data: notes,
        });
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
