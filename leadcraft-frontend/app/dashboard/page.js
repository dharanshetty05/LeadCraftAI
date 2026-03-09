"use client"

import { useEffect, useState } from "react"
import LeadCard from "@/components/LeadCard"
import DashboardMetrics from "@/components/DashboardMetrics"

export default function Dashboard() {

    const [leads, setLeads] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchLeads = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/leads")
            const data = await res.json()
            setLeads(data)
        } catch (error) {
            console.error("Failed to fetch leads", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeads()
    }, [])

    if (loading) return <p className="p-6">Loading leads...</p>

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:5000/api/leads/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            })

            const updatedLead = await res.json()

            setLeads((prevLeads) =>
                prevLeads.map((lead) =>
                    lead._id === id ? updatedLead : lead
                )
            )
        } catch (error) {
            console.error("Status update failed", error)
        }
    }

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                LeadCraftAI Dashboard
            </h1>

            <DashboardMetrics />

            {leads.length === 0 && (
                <p>No leads found</p>
            )}

            <div className="grid gap-6">
                {leads.map((lead) => (
                    <LeadCard key={lead._id} lead={lead} updateStatus={updateStatus} />
                ))}
            </div>
        </div>
    )
}