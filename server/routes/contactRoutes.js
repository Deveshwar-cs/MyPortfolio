const express = require("express")
const Contact = require("../models/Contact")
const router = express.Router()

// Route to handle contact form submission
router.post("/", async (req, res) => {
  try {
    const {name, email, message} = req.body

    // Validate fields
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({success: false, error: "All fields are required"})
    }

    // Trim input values
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    })

    await newContact.save()
    res.status(201).json({success: true, message: "Message sent successfully!"})
  } catch (error) {
    console.error("Error saving contact form:", error)
    res.status(500).json({success: false, error: "Internal Server Error"})
  }
})

module.exports = router
