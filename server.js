const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*"}));

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASS
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post('/send', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message

  let mail = {
    from: name,
    to: process.env.RECEIVING_EMAIL,
    subject: 'Contact form request',
    html: `
      <h3>Email from ${name}, ${email}</h3>
      <p>${message}</p>
    `
  }

  transporter.sendMail(mail, (error, data) => {
    if (error) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});