require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Connect to MongoDB securely
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err))

// Define the Contact Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
})

const Contact = mongoose.model("Contact", ContactSchema)

// API Route to handle contact form submission
app.post("/contact", async (req, res) => {
  const {name, email, message} = req.body

  if (!name || !email || !message) {
    return res.status(400).json({error: "All fields are required"})
  }

  try {
    const newContact = new Contact({name, email, message})
    await newContact.save()
    res.json({success: true, message: "Message sent successfully!"})
  } catch (err) {
    res.status(500).json({error: "Server error"})
  }
})

// Start Server
const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
