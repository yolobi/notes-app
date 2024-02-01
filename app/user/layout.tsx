"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Button from "../__components/button";

const navigations = [
    { name: "Dashboard", href: "/user/dashboard" },
    { name: "My Notes", href: "/user/notes" },
];

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const path = usePathname();

    return (
        <>
            <div>
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <Image
                                width={700}
                                height={600}
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul
                                role="list"
                                className="flex flex-1 flex-col gap-y-7"
                            >
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigations.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={clsx(
                                                        path == item.href
                                                            ? "bg-gray-800 text-white"
                                                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="m-6 mt-auto">
                                    <div>
                                        <Button
                                            text="Sign Out"
                                            color="bg-red-500"
                                        />
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <main className="py-10 lg:pl-72 bg-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8 h-screen bg-gray-200">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
