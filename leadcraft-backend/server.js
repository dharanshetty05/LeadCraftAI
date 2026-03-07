const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const analyzeRoute = require("./routes/analyzeRoute")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/analyze", analyzeRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})