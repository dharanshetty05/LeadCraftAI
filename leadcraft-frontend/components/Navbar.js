"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()
    const linkStyle = (path) =>
        `px-3 py-2 rounded ${
            pathname === path
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"
        }`
    
    return (
        <nav className="w-full border-b bg-white">
            <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
                <h1 className="font-bold text-lg">
                    LeadCraft AI
                </h1>
                <div className="flex gap-3">
                    <Link
                        href="/"
                        className={linkStyle("/")}
                    >
                        Analyze
                    </Link>
                    <Link
                        href="/dashboard"
                        className={linkStyle("/dashboard")}
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    )
}