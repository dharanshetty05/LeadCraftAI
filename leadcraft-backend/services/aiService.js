// External services (Groq AI) here

const Groq = require("groq-sdk")
const { createAnalysisPrompt } = require("../prompts/prompts")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

exports.runBusinessAnalysis = async (data) => {
    const prompt = createAnalysisPrompt(data)

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    })

    const text = completion.choices[0].message.content

    return {
        raw: text
    }
}