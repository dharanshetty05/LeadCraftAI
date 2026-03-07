// Request logic here

const { runBusinessAnalysis } = require("../services/aiService")
const { extractUsername, fetchInstagramData } = require("../services/instagramService")

exports.analyzeLead = async (req, res) => {

    try {
        let { businessName, category, location, bio, caption, instagramUrl } = req.body

        console.log("Analyzing lead:", businessName)

        if (!businessName) {
            return res.status(400).json({
                error: "Business name is required"
            })
        }

        if (!instagramUrl && (!bio || !caption)) {
            return res.status(400).json({
                error: "Provide bio & caption OR an Instagram URL"
            })
        }

        let instagramUsername = null
        let instagramData = null

        if (instagramUrl) {
            instagramUsername = extractUsername(instagramUrl)
            instagramData = await fetchInstagramData(instagramUsername)

            console.log("Instagram Data:", instagramData)

            if (!businessName && instagramData.displayName) {
                businessName = instagramData.displayName
            }
            if (!bio) bio = instagramData.bio
            if (!caption) caption = instagramData.caption
        }

        const result = await runBusinessAnalysis({
            businessName, category, location, bio, caption
        })

        res.json({ ...result, instagramData })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "AI analysis failed"
        })
        
    }
}