// Request logic here

const { runBusinessAnalysis } = require("../services/aiService")

exports.analyzeLead = async (req, res) => {

    try {
        const { businessName, category, location, bio, caption } = req.body

        if (!businessName || !bio || !caption) {
            return res.status(400).json({
                error: "Missing required fields"
            })
        }

        const result = await runBusinessAnalysis({
            businessName, category, location, bio, caption
        })

        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "AI analysis failed"
        })
        
    }
}