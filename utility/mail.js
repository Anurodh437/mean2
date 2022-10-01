const nodemailer = require("nodemailer");

async function main() {
  dotenv.config();
  const name = "Sanjay";
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT, 
    auth: {
      user: process.env.USER,
      pass: process.env.PASS, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: {
      name: "Anurodh Dubey",
      address: "anurodhdubey437@gmail.com",
    }, // sender address
    to: "anurodh.dubey_cs19@gla.ac.in", // list of receivers
    subject: "Hello Amit,", // Subject line
    // text: "Hello world?", // plain text body
    html: `<h1>Here's the new todo task created.</h1>
            <p>Welcome ${name}</p>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
