const express = require("express")
const router = express.Router()

const { getLeads, updateLeadStatus, getLeadStats, updateLeadMessage } = require("../controllers/leadController")

router.get("/", getLeads)
router.get("/stats", getLeadStats)
router.patch("/:id/status", updateLeadStatus)
router.patch("/:id/message", updateLeadMessage)

module.exports = router