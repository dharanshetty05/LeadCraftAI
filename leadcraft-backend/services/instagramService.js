exports.extractUsername = (instagramUrl) => {

    if (!instagramUrl) {
        throw new Error("Instagram URL is required")
    }

    const cleanedUrl = instagramUrl
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .trim()

    const parts = cleanedUrl.split("/")

    if (parts.length < 2 || parts[0] != "instagram.com") {
        throw new Error("Invalid Instagram URL")
    }

    const username = parts[1]

    return username
}

const axios = require("axios")
const cheerio = require("cheerio")

exports.fetchInstagramData = async (username) => {

    const url = `https://www.instagram.com/${username}/`

    try{
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        })

        const html = response.data
        const $ = cheerio.load(html)

        const description = $('meta[name="description"]').attr("content")

        let bio = ""
        let caption = ""
        let followers = ""
        let posts = ""
        let displayName = ""

        if (description) {
            const parts = description.split("-")

            if (parts.length > 0) {
                const stats = parts[0]
                const statsParts = stats.split(",")
                
                if (statsParts[0])  followers = statsParts[0].trim()
                if (statsParts[2])  posts = statsParts[2].trim()
            }
            
            if (parts.length > 1) {
                const nameSection = parts[1]
                const nameMatch = nameSection.match(/^(.*?)\(@/)
                if (nameMatch) displayName = nameMatch[1].trim()
            }

            const bioMatch = description.match(/Instagram:\s*"([^"]+)"/)
            if (bioMatch) bio = bioMatch[1]
            caption = bio
        }
        
        return { username, displayName, bio, caption, followers, posts }

    } catch (error) {
        console.error("Instagram fetch error:", error.message)

        return {
            username,
            displayName: "",
            bio: "",
            caption: "",
            followers: "",
            posts: ""
        }
    }
}