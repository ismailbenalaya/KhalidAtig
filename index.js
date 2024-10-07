var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("The server started on port 3000!!");
});

var transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false,
    auth: {
        user: "ismail2020benalaya@gmail.com",
        pass: "mjvdoxadvkwadtjo",  // App-specific password for Gmail
    },
});

const sendEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const mailOptions = {
            from: email, // Sender's email from the form input
            to: "ismail2020benalaya@gmail.com", // Your email to receive the contact form
            subject: subject,
            html: `
                <h1>Message from ${name}</h1>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        console.error("Error sending email: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

app.post("/send-email", sendEmail);
