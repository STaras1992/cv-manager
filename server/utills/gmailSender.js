const validator = require('email-validator');
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

transporter.verify((error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log('Server is ready to send emails');
  }
});

exports.verifyAdress = async (adress) => {
  const promise = await new Promise(async (resolve, reject) => {
    if (validator.validate(adress)) {
      resolve(true);
    } else {
      reject(false);
    }
  });

  return promise;
};

exports.sendMail = async (data) => {
  const mailOptions = {
    from: `CV Manager <${data.from}>`,
    replyTo: data.from,
    to: data.to,
    subject: data.subject,
    html: data.cover,
    attachments: [{ href: data.file }],
    headers: {
      replyTo: data.from,
    },
  };

  const promise = await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  return promise;
};
