const gmailSender = require('../utills/gmailSender');

exports.sendMail = async (req, res, next) => {
  try {
    const gmailResponse = await gmailSender.sendMail(req.body); //TODO UNCOMMENT@!
    // const gmailResponse = null;
    if (gmailResponse) {
      res.status(200).json({
        status: 'succes',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Send mail error',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
