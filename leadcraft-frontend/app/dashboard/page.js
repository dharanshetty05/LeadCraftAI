"use client"

import { useEffect, useState } from "react"
import LeadCard from "@/components/LeadCard"
import DashboardMetrics from "@/components/DashboardMetrics"
import LeadSearchBar from "@/components/LeadSearchBar"
import LeadDetailModal from "@/components/LeadDetailModal"

export default function Dashboard() {

    const [leads, setLeads] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [selectedLead, setSelectedLead] = useState(null)

    const fetchLeads = async () => {
        try {
            let url = "http://localhost:5000/api/leads"
            const params = new URLSearchParams()

            if (searchQuery) params.append("search", searchQuery)
            if (statusFilter) params.append("status", statusFilter)

            if (params.toString()) {
                url += `?${params.toString()}`
            }

            const res = await fetch(url)
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
    }, [searchQuery, statusFilter])

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

    const updateLeadMessage = (updatedLead) => {
        setLeads((prevLeads) => 
            prevLeads.map((lead) => 
                lead._id === updatedLead._id ? updatedLead : lead
            )
        )
        setSelectedLead(updatedLead)
    }

    const sortLeadsByScore = (leads) => {
        const priority = {
            HIGH: 1,
            MEDIUM: 2,
            LOW: 3
        }
        return [...leads].sort((a, b) => {
            if (a.websiteDetected !== b.websiteDetected) {
                return a.websiteDetected ? 1 : -1
            }
            return priority[a.opportunityScore] - priority[b.opportunityScore]
        })
    }

    return (
        <div className="max-w-7xl mx-auto p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    LeadCraft AI Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Analyze, prioritize and manage your outreach leads
                </p>
            </div>

            <DashboardMetrics />

            <LeadSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setStatusFilter("")}
                    className={`px-4 py-2 rounded ${
                        statusFilter === "" ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                >
                    All
                </button>

                <button
                    onClick={() => setStatusFilter("NEW")}
                    className={`px-4 py-2 rounded ${
                        statusFilter === "NEW" ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                >
                    New
                </button>

                <button
                    onClick={() => setStatusFilter("MESSAGED")}
                    className={`px-4 py-2 rounded ${
                        statusFilter === "MESSAGED" ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                >
                    Messaged
                </button>

                <button
                    onClick={() => setStatusFilter("REPLIED")}
                    className={`px-4 py-2 rounded ${
                        statusFilter === "REPLIED" ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                >
                    Replied
                </button>
            </div>

            {leads.length === 0 && (
                <div className="text-center text-gray-500 mt-12">
                    <p className="text-lg">No leads found</p>
                    <p className="text-sm mt-1">
                        Analyze an Instagram profile to start generating leads.
                    </p>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {sortLeadsByScore(leads).map((lead) => (
                    <LeadCard key={lead._id} lead={lead} updateStatus={updateStatus} openLead={setSelectedLead} />
                ))}
            </div>

            {selectedLead && (
                <LeadDetailModal
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                    onMessageUpdate={updateLeadMessage}
                />
            )}
        </div>
    )
}