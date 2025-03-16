const express = require("express")
const Contact = require("../models/Contact")
const router = express.Router()

// Route to handle contact form submission
router.post("/", async (req, res) => {
  try {
    const {name, email, message} = req.body
    const newContact = new Contact({name, email, message})

    await newContact.save()
    res.status(201).json({success: true, message: "Message sent successfully!"})
  } catch (error) {
    res.status(500).json({success: false, error: "Server error"})
  }
})

module.exports = router
