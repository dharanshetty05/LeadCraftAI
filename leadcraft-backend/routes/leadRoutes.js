const express = require("express")
const router = express.Router()

const { getLeads, updateLeadStatus } = require("../controllers/leadController")

router.get("/", getLeads)
router.patch("/:id/status", updateLeadStatus)

module.exports = router