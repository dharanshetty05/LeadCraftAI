import LeadForm from "../components/LeadForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold">LeadCraft AI</h1>

        <p className="text-gray-600 mt-3">
          Generate personalized outreach messages for businesses without websites
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Paste Instagram bio and caption → get a ready-to-send message
        </p>
      </div>

      <div className="flex justify-center">
        <LeadForm />
      </div>

    </main>
  )
}