"use client"

import { useState } from "react"

export default function LeadDetailModal({ lead, onClose, onMessageUpdate }) {

    const [message, setMessage] = useState(lead.message)
    const [saving, setSaving] = useState(false)

    const saveMessage = async () => {
        try {
            setSaving(true)
            const res = await fetch(
                `http://localhost:5000/api/leads/${lead._id}/message`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message })
                }
            )
            const updatedLead = await res.json()
            onMessageUpdate(updatedLead)
            setSaving(false)
        } catch (error) {
            console.error("Message update failed", error)
            setSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">

                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">
                        {lead.businessName}
                    </h2>

                    <button onClick={onClose}>
                        ✕
                    </button>
                </div>

                <p className="text-sm text-gray-500 mb-2">
                    @{lead.instagramUsername}
                </p>

                <p className="mb-2">
                    Followers: {lead.followers}
                </p>

                <p className="font-medium mt-3">
                    Opportunity Score
                </p>
                <p>{lead.opportunityScore}</p>

                <p className="font-medium mt-3">
                    Website Detected
                </p>
                <p>{lead.websiteDetected ? "Yes" : "No"}</p>

                <p className="font-medium mt-3">
                    Summary
                </p>
                <p>{lead.summary}</p>

                <p className="font-medium mt-3">
                    Opportunity
                </p>
                <p>{lead.opportunity}</p>

                <p className="font-medium mt-4">
                    Outreach Message
                </p>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                    rows="4"
                />

                <button
                    onClick={saveMessage}
                    disabled={saving}
                    className="mt-3 bg-black text-white px-4 py-2 rounded"
                >
                    {saving ? "Saving..." : "Save Message"}
                </button>

            </div>

        </div>
    )
}