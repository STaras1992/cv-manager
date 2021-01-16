const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_URL,
  },
  //proxy: 'http://user:pass@localhost:8080', // optional proxy, default is false
};

const transporter = nodemailer.createTransport(mg(auth));

exports.sendMail = (emailTo, emailFrom, subject, file, html, cb) => {
  const mailOptions = {
    from: emailFrom,
    to: emailTo, // TODO: the receiver email has to be authorized for the free tier
    subject,
    html,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      //return cb(err, null);
      console.log(err.message);
      return err;
    }
    console.log(data);
    return data;
    // return cb(null, data);
  });
};

// transporter.sendMail(
//   {
//     from: 'myemail@example.com',
//     to: 'recipient@domain.com', // An array if you have multiple recipients.
//     subject: 'Hey you, awesome!',
//     // 'h:Reply-To': 'reply2this@company.com',
//     html: '<b>Wow Big powerful letters</b>',
//     text: 'Mailgun rocks, pow pow!',
//   },
//   (err, info) => {
//     if (err) {
//       console.log(`Error: ${err}`);
//     } else {
//       console.log(`Response: ${info}`);
//     }
//   }
// );
