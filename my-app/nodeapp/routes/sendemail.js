const nodemailer = require("nodemailer");

function sendEmail(to,subject,htmlBody,replyTo,files) {
  return new Promise(async (resolve, reject) => {

  let transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user: "newbie14052022@gmail.com", // generated ethereal user
      pass: "Newbie@123", // generated ethereal password
    },
  });
    let info = await transporter.sendMail({
      from: 'newbie14052022@gmail.com',
      to: to,
      subject: subject,
      html: htmlBody,
      replyTo: replyTo,
      attachments: files,
    });
    resolve(true);
  });
}

module.exports = { sendEmail };