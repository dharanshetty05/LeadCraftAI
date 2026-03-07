const Lead = require("../models/lead")

const findLeadByUsername = async (username) => {
    const lead = await Lead.findOne({ instagramUsername: username })
    return lead
}

const createLead = async (leadData) => {
    const lead = new Lead(leadData)
    const savedLead = await lead.save()
    return savedLead
}

const getAllLeads = async () => {
    const leads = await Lead.find().sort()({ createdAt: -1 })
    return leads
}

const updateLeadStatus = async (leadId, status) => {
    const lead = await Lead.findByIdAndUpdate(
        leadId,
        { status },
        { new: true }
    )
    return lead
}

module.exports = {
    findLeadByUsername,
    createLead,
    getAllLeads,
    updateLeadStatus
}