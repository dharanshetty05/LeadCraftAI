// API endpoints here

const express = require("express")
const router = express.Router()

const { analyzeLead } = require("../controllers/analyzeController")

router.post("/", analyzeLead)

module.exports = router