const nodemailer = require("nodemailer");

const sendMail = async ({ to, text, subject }) => {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const message = {
    from: "admin@readersbuffet.com",
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

//   var transport = nodemailer.createTransport({
//     host: "send.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.MAILTRAP_USER,
//       pass: process.env.MAILTRAP_PASS,
//     },
//   });
