"use client";
import Button from "@/app/__components/button";
import { Register } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    async function handleLogin(e: React.SyntheticEvent) {
        e.preventDefault();
        try {
            const resp = await fetch("api/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    pass: pass,
                }),
            });

            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        width={700}
                        height={600}
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPass(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <Button
                                text="Sign in"
                                color="bg-indigo-600"
                                type="submit"
                            />
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Not a member?{" "}
                        <Link
                            href="/auth/register"
                            className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
