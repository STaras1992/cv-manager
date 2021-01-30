const validator = require('email-validator');
const nodemailer = require('nodemailer');
const CV_MANAGER = 'cv-manager';
const STAS = 'stas';

let sender = CV_MANAGER;

const stasTransport = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.STAS_GMAIL_USER,
    clientId: process.env.STAS_GMAIL_CLIENT_ID,
    clientSecret: process.env.STAS_GMAIL_CLIENT_SECRET,
    refreshToken: process.env.STAS_GMAIL_REFRESH_TOKEN,
    accessToken: process.env.STAS_GMAIL_ACCESS_TOKEN,
  },
};

const publicTransport = {
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

let transporter = nodemailer.createTransport(publicTransport);

transporter.verify((error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log('Cv Manager is ready to send emails');
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
    from: sender === STAS ? `Stas Tarasenko <${data.from}>` : `CV Manager <${data.from}>`,
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

/*For admin (STAS) user mail will be sent from my email.Else from cv-manager email*/
exports.reconfigSender = (email) => {
  if (email === process.env.STAS_GMAIL_USER) {
    if (sender === STAS) return;

    transporter = nodemailer.createTransport(stasTransport);
    transporter.verify((error) => {
      if (error) {
        console.log(error.message);
      } else {
        sender = STAS;
        console.log(`Mail sender changed to ${STAS}`);
      }
    });
  } else {
    if (sender === CV_MANAGER) return;

    transporter = nodemailer.createTransport(publicTransport);
    transporter.verify((error) => {
      if (error) {
        console.log(error.message);
      } else {
        sender = CV_MANAGER;
        console.log(`Mail sender changed to ${CV_MANAGER}`);
      }
    });
  }
};
