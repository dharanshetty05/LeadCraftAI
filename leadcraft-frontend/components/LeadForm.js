"use client"

import { useState } from "react"

export default function LeadForm() {

    const [formData, setFormData] = useState({
        businessName: "",
        category: "",
        location: "",
        bio: "",
        caption: ""
    })

    const [result, setResult] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Submitting:", formData)

        try {
            const response = await fetch("http://localhost:5000/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            setResult(data)
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (

        <div className="flex flex-col items-center space-y-6">

        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl space-y-4"
        >
            <h2 className="text-xl font-semibold">Analyze Business</h2>

            <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <textarea
                name="bio"
                placeholder="Instagram Bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="3"
                required
            />

            <textarea                                name="caption"
                placeholder="Sample Post Caption"
                value={formData.caption}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="3"
                required
            />

            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
                Analyze Lead
            </button>
        </form>

        {result && (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mt-6 space-y-4">
                <h2 className="text-xl font-semibold">Analysis Result</h2>
                    <div>
                        <h3 className="font-semibold">Business Summary</h3>
                        <p className="text-gray-700">{result.summary}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Opportunity</h3>
                        <p className="text-gray-700">{result.opportunity}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Outreach Message</h3>
                        <p className="text-gray-700">{result.message}</p>
                    </div>
            </div>
        )}
        </div>
    )
}