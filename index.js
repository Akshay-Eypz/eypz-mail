const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let inbox = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Eypz Fake Email API is live.");
});

app.post("/receive", (req, res) => {
    const { to, from, subject, message } = req.body;
    if (!to || !from || !subject || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    inbox.push({ to, from, subject, message, time: new Date() });
    res.json({ status: "Received" });
});

app.get("/inbox/:email", (req, res) => {
    const { email } = req.params;
    const userMails = inbox.filter(mail => mail.to === email);
    res.json({ inbox: userMails });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
