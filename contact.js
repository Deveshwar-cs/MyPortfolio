document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault() // Prevent default form submission

      const form = event.target
      if (!form.checkValidity()) {
        form.classList.add("was-validated") // Apply Bootstrap validation styles
        return
      }

      // Get form data
      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
      }

      try {
        const response = await fetch(
          "https://portfolio-backend-a56r.onrender.com/contact",
          {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
          }
        )

        const result = await response.json()
        if (response.ok) {
          alert("✅ Message sent successfully!")
          document.getElementById("contact-form").reset()
          form.classList.remove("was-validated") // Remove validation styles after successful submit
        } else {
          alert("❌ Failed to send message: " + result.error)
        }
      } catch (error) {
        console.error("Error:", error)
        alert("❌ Something went wrong!")
      }
    })
})

const submitBtn = document.getElementById("submit-btn")

try {
  submitBtn.innerHTML = "Sending..." // Change button text
  submitBtn.disabled = true // Disable button to prevent multiple clicks

  const response = await fetch(
    "https://portfolio-backend-a56r.onrender.com/contact",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    }
  )

  const result = await response.json()
  if (response.ok) {
    alert("✅ Message sent successfully!")
    document.getElementById("contact-form").reset()
  } else {
    alert("❌ Failed to send message: " + result.error)
  }
} catch (error) {
  console.error("Error:", error)
  alert("❌ Something went wrong!")
} finally {
  submitBtn.innerHTML = "Send" // Restore button text
  submitBtn.disabled = false // Enable button again
}
