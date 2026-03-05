// AI prompt templates  

exports.createAnalysisPrompt = (data) => {

return `
You are analyzing a small business.

Business Name: ${data.businessName}
Category: ${data.category}
Location: ${data.location}

Instagram Bio:
${data.bio}

Sample Caption:
${data.caption}

Identify:

1. What the business does
2. Their online presence
3. Whether they appear to have a website
4. One opportunity where a website could help them

Return response in JSON format:

{
"summary": "",
"opportunity": ""
}
`
}