"use client"

import { useEffect, useState } from "react"

export default function DashboardMetrics() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        newLeads: 0,
        messagedLeads: 0,
        repliedLeads: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/leads/stats")
            const data = await res.json()
            setStats(data)
            setLoading(false)
        } catch (error) {
            console.error("Failed to fetch stats", error)
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
                        <div className="h-3 w-20 bg-slate-100 rounded mb-4" />
                        <div className="h-8 w-12 bg-slate-100 rounded" />
                    </div>
                ))}
            </div>
        )
    }

    const metrics = [
        {
            label: "Total Leads",
            value: stats.totalLeads,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            accent: "text-slate-600",
            bg: "bg-slate-50",
            border: "border-slate-200",
        },
        {
            label: "New",
            value: stats.newLeads,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            ),
            accent: "text-violet-600",
            bg: "bg-violet-50",
            border: "border-violet-100",
        },
        {
            label: "Messaged",
            value: stats.messagedLeads,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            accent: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
        },
        {
            label: "Replied",
            value: stats.repliedLeads,
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            accent: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
        },
    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {metrics.map((m) => (
                <div
                    key={m.label}
                    className={`bg-white border ${m.border} rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200`}
                >
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${m.bg} ${m.accent}`}>
                        {m.icon}
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{m.label}</p>
                        <p className="text-3xl font-bold text-slate-800 leading-none">{m.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}