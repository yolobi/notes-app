import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: number } }
) {
    try {
        //need to verify user first from jwt
        const noteId = params.id;
        const deleted = await prismadb.note.delete({
            where: {
                id: Number(noteId),
            },
        });
        console.log(deleted);
        return NextResponse.json({
            data: "Succesfully delete",
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

interface UpdateRequest {
    title: string;
    content: string;
}

export async function PUT(
    request: Request,
    { params }: { params: { id: number } }
) {
    try {
        const { title, content } = (await request.json()) as UpdateRequest;
        const noteId = Number(params.id);
        const updated = await prismadb.note.update({
            where: {
                id: noteId,
            },
            data: {
                title: title,
                content: content,
            },
        });
        return NextResponse.json({
            data: updated,
        });
    } catch (error) {
        console.log(error);
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
