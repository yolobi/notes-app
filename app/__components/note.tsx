"use client";
import React, { useState } from "react";
import Button from "./button";

function Note({ content, title }: { content: string; title: string }) {
    const [showModal, setShowModal] = useState(false);
    const [noteState, setNoteState] = useState({
        title: title,
        content: content,
    });

    return (
        <>
            <div className="block m-4">
                <div
                    className="bg-white p-4 rounded-md border border-gray-300 w-64 h-96 overflow-hidden hover:bg-gray-100 hover:cursor-pointer"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <p className="text-gray-900">{noteState.content}</p>
                </div>
                <div>
                    <h1 className="text-gray-900 font-medium">
                        {noteState.title}
                    </h1>
                    <p className="text-gray-400 text-xs">2024-01-01</p>
                </div>
            </div>
            {showModal && (
                <>
                    <div className="bg-black/20 absolute w-screen min-h-full h-full top-0 left-0 z-[999] justify-center items-center flex">
                        <div className="w-[40%] h-[50%] bg-white p-6 rounded-md">
                            <div className="h-full flex flex-col">
                                <form action="#" className="relative h-full">
                                    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm text-black focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 h-full">
                                        <label
                                            htmlFor="title"
                                            className="sr-only"
                                        >
                                            {noteState.title}
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setNoteState((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }));
                                            }}
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="block w-full p-4 border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                                            placeholder="Title"
                                            value={noteState.title}
                                        />
                                        <label
                                            htmlFor="description"
                                            className="sr-only"
                                        >
                                            {noteState.content}
                                        </label>
                                        <textarea
                                            onChange={(e) => {
                                                setNoteState((prev) => ({
                                                    ...prev,
                                                    content: e.target.value,
                                                }));
                                            }}
                                            name="description"
                                            id="description"
                                            className="block w-full p-4 h-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Write a description..."
                                            defaultValue={""}
                                            value={noteState.content}
                                        />
                                    </div>
                                </form>
                                <div className="flex">
                                    <div className="my-2">
                                        <Button
                                            text="Close"
                                            color="bg-red-600"
                                            type="button"
                                            handler={() => setShowModal(false)}
                                        />
                                    </div>
                                    <div className="my-2 ml-2">
                                        <Button
                                            text="Save"
                                            color="bg-indigo-600"
                                            type="button"
                                            handler={() => {
                                                console.log(
                                                    "saving to database"
                                                );
                                                setShowModal(false);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Note;
