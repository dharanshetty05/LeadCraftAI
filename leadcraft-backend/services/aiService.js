// External services (Groq AI) here

const Groq = require("groq-sdk")
const { createAnalysisPrompt, createMessagePrompt } = require("../prompts/prompts")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

exports.runBusinessAnalysis = async (data) => {
    
    try{
        // Stage 1: Business Analysis
        const analysisPrompt = createAnalysisPrompt(data)

        const analysisResponse = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            messages: [
                {
                    role: "user",
                    content: analysisPrompt
                }
            ]
        })

        const analysisText = analysisResponse.choices[0].message.content
        let analysisJSON
        try {
            analysisJSON = JSON.parse(analysisText)
            } catch (error) {

            const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error("Invalid AI response format")
            }

            analysisJSON = JSON.parse(jsonMatch[0])
        }

        // Stage 2: Message Generation
        const messagePrompt = createMessagePrompt({
            businessName: data.businessName,
            summary: analysisJSON.summary,
            opportunity: analysisJSON.opportunity
        })

        const messageResponse = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            messages: [
                {
                    role: "user",
                    content: messagePrompt
                }
            ]
        })

        let messageText = messageResponse.choices[0].message.content.trim()
        if (
            (messageText.startsWith('"') && messageText.endsWith('"')) ||
            (messageText.startsWith("'") && messageText.endsWith("'"))
        ) {
            messageText = messageText.slice(1, -1)
        }

        console.log("AI ANALYSIS JSON:", analysisJSON)
        
        return {
            summary: analysisJSON.summary,
            opportunity: analysisJSON.opportunity,
            opportunityScore: analysisJSON.opportunityScore || "MEDIUM",
            websiteDetected: analysisJSON.websiteDetected ?? false,
            message: messageText
        }

    } catch(error) {
        console.error("AI error:", error)
        throw new Error("AI processing failed")
    }

}