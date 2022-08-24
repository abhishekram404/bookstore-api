const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = async ({ to, text, subject }) => {
  const message = {
    from: process.env.GMAIL_USER,
    to,
    subject: subject || "Reader's Buffet",
    text: text || "Hello from Reader's buffet :D ",
  };
  try {
    const info = await transport.sendMail(message);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
