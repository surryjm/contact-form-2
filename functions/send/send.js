const nodemailer = require('nodemailer');
require('dotenv').config()

exports.handler = async function (event, context) {

  const payload = JSON.parse(event.body);
  const { email, name, message } = payload;
  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASS
    },
  });

  try {
    let info = await transporter.sendMail({
      from: process.env.RECEIVING_EMAIL,
      to: process.env.RECEIVING_EMAIL,
      subject: 'Contact form request',
      html: `<h3>Email from ${name}, ${email}</h3><p>${message}</p>`
    });
    console.log(info);
    callback(null, { statusCode: 200, body: JSON.stringify(info) });
  } catch (error) {
    callback(error);
  };
  
}


