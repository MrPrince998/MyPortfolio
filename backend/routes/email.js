const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer")

// Create a transporter for Gmail using secure connection (port 465)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.User_Email || "peincerana234@gmail.com", // your Gmail address
    pass: process.env.SECRET_KEY || "qvewhcifiihoatvx", // your App Password (not your real password)
  },
});

// POST route to send emails
router.post("/send", async (req, res) => {
  // Destructure the form data from the request body
  const { name, email, phone, message } = req.body;

  // Setup email options: customize this HTML as needed
 const mailOptions = {
   from: '"Website Contact Form" <peincerana234@gmail.com>', // your own Gmail (authenticated sender)
   to: "peincerana234@gmail.com", // where you want to receive the message
   replyTo: email, // this allows you to reply directly to the sender's email
   subject: `New message from ${name}`,
   html: `
    <h2>Contact Details:</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <><strong>Message:</strong> ${message}<p>
  `,
 };


  try {
    // Send email using Nodemailer
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send message");
  }
});

module.exports = router;
