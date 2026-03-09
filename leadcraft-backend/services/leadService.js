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

const getAllLeads = async (filters = {}) => {
    const query = {}
    if (filters.status) query.status = filters.status
    if (filters.search) {
        query.$or = [
            { businessName: { $regex: filters.search, $options: "i" } },
            { instagramUsername: { $regex: filters.search, $options: "i" } }
        ]
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 })
    return leads
}

const updateLeadStatus = async (leadId, status) => {
    const lead = await Lead.findByIdAndUpdate(
        leadId,
        { status },
        { returnDocument: "after",  runValidators: true }
    )
    return lead
}

const updateLeadMessage = async (leadId, message) => {
    const lead = await Lead.findByIdAndUpdate(
        leadId,
        { message },
        { returnDocument: "after", runValidators: true }
    )
    return lead
}

const getLeadById = async (id) => {
    const lead = await Lead.findById(id)
    return lead
}

const getLeadStats = async() => {
    const totalLeads = await Lead.countDocuments()
    const newLeads = await Lead.countDocuments({ status: "NEW" })
    const messagedLeads = await Lead.countDocuments({ status: "MESSAGED" })
    const repliedLeads = await Lead.countDocuments({ status: "REPLIED" })

    return { totalLeads, newLeads, messagedLeads, repliedLeads }
}

module.exports = {
    findLeadByUsername,
    createLead,
    getAllLeads,
    updateLeadStatus,
    updateLeadMessage,
    getLeadById,
    getLeadStats
}