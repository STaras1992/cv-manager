const mailSender = require('../utills/mailSender');
const gmailSender = require('../utills/gmailSender');

exports.sendMail = (req, res, next) => {
  try {
    console.log(req.body);
    gmailSender.sendMail(res, req.body);
    // const response = mailSender.sendMail(
    //   req.body.to,
    //   req.body.from,
    //   req.body.subject,
    //   req.body.file,
    //   req.body.cover,
    //   (err, data) => {
    //     if (err) return false;
    //     return data;
    //   }
    // );
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
