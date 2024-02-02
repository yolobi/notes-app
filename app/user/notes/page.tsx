import Note from "@/app/__components/note";
import React from "react";

async function getData() {
    const res = await fetch("http://localhost:3000/api/note", {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcwNjgzMDk5NH0.VN2fIXeiPwDkDrmAHxeGRx1XcQoIUPh71rdJ2McChCE",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page() {
    const data = await getData();
    return (
        <>
            <div className="flex">
                {data.data.map(
                    (note: {
                        content: string;
                        title: string;
                        id: React.Key | null | undefined;
                    }) => {
                        return (
                            <Note
                                content={note.content}
                                title={note.title}
                                key={note.id}
                            />
                        );
                    }
                )}
            </div>
        </>
    );
}
