"use client"

export default function LeadSearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search leads by business name or Instagram username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}