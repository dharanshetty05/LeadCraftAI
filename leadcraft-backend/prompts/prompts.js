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

exports.createMessagePrompt = (data) => {

return `
You help generate personalized outreach messages.

Business Name: ${data.businessName}

Business Summary:
${data.summary}

Opportunity:
${data.opportunity}

Service:
Conversion-focused websites for small businesses.

Write a short WhatsApp outreach message.

Rules:
- Friendly tone
- Mention the business specifically
- Mention the opportunity
- Do not sound like spam
- Keep under 70 words
`
}