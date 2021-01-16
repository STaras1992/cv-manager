const nodemailer = require('nodemailer');

const transport = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN,
  },
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to send mails');
  }
});

exports.sendMail = (res, data) => {
  const mailOptions = {
    // from: data.from,
    replyTo: data.from,
    to: data.to,
    subject: data.subject,
    html: data.cover,
    attachments: [{ href: data.file }],
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        status: 'fail',
      });
    } else {
      console.log('Mail sent...');
      res.status(200).json({
        status: 'success',
      });
    }
  });
};

// const mailOptions = {
//   from: 'starasp1992@gmail.com',
//   to: 'starasp1992@gmail.com',
//   subject: 'test',
//   html: '<p>hello</p>',
// };

// transporter.sendMail(mailOptions, function (err, data) {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.status(200).log('Mail sent...');
//   }
// });
