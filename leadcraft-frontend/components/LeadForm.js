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
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

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
            setLoading(false)
        } catch (error) {
            console.error("Error:", error)
            setLoading(false)
        }
    }

    const handleCopy = () => {
        if (!result) return

        navigator.clipboard.writeText(result.message)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
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
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
            >
                {loading ? "Analyzing..." : "Analyze Lead"}
            </button>
        </form>

        {loading && (
            <p className="text-gray-600 text-sm">
                Analyzing business with AI...
            </p>
        )}

        {result && (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl border-t border-gray-300 mt-6 space-y-4">
                <h2 className="text-xl font-semibold">Analysis Result</h2>
                    <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold text-lg mb-1">Business Summary</h3>
                        <p className="text-gray-700 leading-relaxed">{result.summary}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold text-lg mb-1">Opportunity</h3>
                        <p className="text-gray-700 leading-relaxed">{result.opportunity}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded">
                        <h3 className="font-semibold text-lg mb-1">Outreach Message</h3>
                        <div className="bg-green-50 border border-green-200 p-4 rounded text-gray-800 leading-relaxed">
                            {result.message}
                        </div>

                        <button
                            onClick={handleCopy}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Copy Message
                        </button>

                        {copied && (
                            <p className="text-green-600 text-sm mt-1">
                                Copied to clipboard ✓
                            </p>
                        )}
                    </div>
                <button
                    onClick={() => {
                        setResult(null)
                        setCopied(false)
                        setFormData({
                        businessName: "",
                        category: "",
                        location: "",
                        bio: "",
                        caption: ""
                        })
                    }}
                    className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                    Analyze Another Lead
                </button>
            </div>
            
        )}

        </div>
    )
}