"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ErrorMessage";

export default function Home() {
    const [status, setStatus] = useState("Checking Firebase...");
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simple check to see if auth object is initialized
        if (auth) {
            setStatus("Firebase Initialized Successfully! ✅");
        } else {
            setError("Failed to initialize Firebase.");
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
            <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col gap-8">
                <h1 className="text-4xl font-bold text-slate-800">Template Project</h1>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md text-center space-y-4">
                    <p className="text-lg text-slate-600 font-medium">{status}</p>

                    <ErrorMessage message={error} />

                    <div className="flex gap-4 justify-center pt-4">
                        <Button onClick={() => alert("Primary Clicked")}>Primary Action</Button>
                        <Button variant="secondary" onClick={() => alert("Secondary Clicked")}>Secondary</Button>
                    </div>
                </div>

                <div className="text-slate-400 text-center max-w-lg">
                    <p>This template includes modular architecture, Firebase setup, and best practices documented in <code className="bg-slate-200 px-1 rounded text-slate-600">GEMINI.md</code></p>
                </div>
            </div>
        </main>
    );
}
