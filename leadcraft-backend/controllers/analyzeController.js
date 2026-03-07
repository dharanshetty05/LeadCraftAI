// Request logic here

const { runBusinessAnalysis } = require("../services/aiService")
const { extractUsername, fetchInstagramData } = require("../services/instagramService")
const leadService = require("../services/leadService")

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

            if (instagramUsername) {
                const existingLead = await leadService.findLeadByUsername(instagramUsername)
                if (existingLead) {
                    console.log("Lead already exists in database")
                    return res.json(existingLead)
                }
            }

            instagramData = await fetchInstagramData(instagramUsername)
            console.log("Instagram Data:", instagramData)

            if (!businessName && instagramData.displayName) businessName = instagramData.displayName
            if (!bio) bio = instagramData.bio
            if (!caption) caption = instagramData.caption
        }

        const result = await runBusinessAnalysis({
            businessName, category, location, bio, caption
        })

        const newLead = await leadService.createLead({
            businessName,
            instagramUsername,
            displayName: instagramData?.displayName,
            instagramUrl,
            bio,
            category,
            location,
            followers: instagramData?.followers,
            posts: instagramData?.posts,
            summary: result.summary,
            opportunity: result.opportunity,
            message: result.message,
            status: "NEW"
        })

        res.json({ newLead })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "AI analysis failed"
        })
        
    }
}