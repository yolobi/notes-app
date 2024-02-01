import Note from "@/app/__components/note";
import React from "react";

const notes = [
    {
        id: 1,
        content:
            "This is my first notes Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, atque!",
        title: "First Note",
    },
    {
        id: 2,
        content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur voluptatem incidunt dolores pariatur. Aspernatur qui quos rem tempora, nostrum aperiam aut laborum voluptatibus impedit quae odio doloribus beatae ab soluta assumenda commodi voluptatum aliquid eaque repellendus dolor minus totam maiores, saepe odit. Id voluptate perferendis, reiciendis ipsum in vel qui?",
        title: "Second Note",
    },
];

function Page() {
    return (
        <>
            <div className="flex">
                {notes.map((note) => {
                    return (
                        <Note
                            content={note.content}
                            title={note.title}
                            key={note.id}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Page;
