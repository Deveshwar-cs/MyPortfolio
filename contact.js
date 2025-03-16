document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault() // Prevent default form submission

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      }

      try {
        // Send data to backend
        const response = await fetch(
          "https://portfolio-backend-a56r.onrender.com/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        )

        const result = await response.json()
        if (response.ok) {
          alert("✅ Message sent successfully!")
          document.getElementById("contact-form").reset() // Clear form
        } else {
          alert("❌ Failed to send message: " + result.error)
        }
      } catch (error) {
        console.error("Error:", error)
        alert("❌ Something went wrong!")
      }
    })
})
