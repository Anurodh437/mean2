const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailToUSer = async (name, email) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORTEMAIL,
    auth: {
      user: process.env.USER_ADMIN,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: {
        name: "Anurodh Dubey",
        address: "anurodhdubey437@gmail.com",
      }, // sender address
      to: "anurodh.dubey_cs19@gla.ac.in", // list of receivers
      subject: "Hello Amit,", // Subject line
      // text: "Hello world?", // plain text body
      html: `<h1 style="color:orangered;">Here's the new todo task created.</h1>
            <p>Welcome ${name}</p>
    `, // html body
    })
    .catch(console.error);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = { sendEmailToUSer };
