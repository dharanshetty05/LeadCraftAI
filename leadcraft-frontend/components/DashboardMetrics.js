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
        return <p className="text-gray-500">Loading metrics...</p>
    }

    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white shadow rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Total Leads</p>
                <p className="text-2xl font-bold">{stats.totalLeads}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">New</p>
                <p className="text-2xl font-bold">{stats.newLeads}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Messaged</p>
                <p className="text-2xl font-bold">{stats.messagedLeads}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Replied</p>
                <p className="text-2xl font-bold">{stats.repliedLeads}</p>
            </div>
        </div>
    )
}