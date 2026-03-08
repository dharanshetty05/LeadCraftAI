const leadService = require("../services/leadService")

exports.getLeads = async (req, res) => {
    try {
        const leads = await leadService.getAllLeads()
        res.json(leads)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Failed to fetch leads"
        })
    }
}

exports.updateLeadStatus = async (req, res) => {
    try {

        console.log("PATCH request received", req.params.id, req.body)
        const { id } = req.params
        const { status } = req.body

        if (!status){
            return res.status(400).json({
                error: "Status is required"
            })
        }

        const existingLead = await leadService.getLeadById(id)

        if (!existingLead) {
            return res.status(404).json({
                error: "Lead not found"
            })
        }

        if (existingLead.status === status) {
            return res.status(200).json({
                message: "Status already set",
                lead: existingLead
            })
        }

        const updatedLead = await leadService.updateLeadStatus(id, status)
        
        if (!updatedLead) {
            return res.status(404).json({
                error: "Lead not found"
            })
        }

        res.status(200).json(updatedLead)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Failed to update lead status"
        })
    }
}