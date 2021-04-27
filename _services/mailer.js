const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (user) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Payment reminder",
    text: `Hello ${user.name}, your payment is overdue`,
  };

  if (process.env.EMAIL) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};

module.exports = sendEmail;
