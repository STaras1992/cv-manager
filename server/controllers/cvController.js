const { models } = require('../models/sequelize');

exports.getAllCv = async (req, res, next) => {
  try {
    const result = await models.cv.findAll({ raw: true });
    // console.log('getAllCv result:\n' + JSON.stringify(result));
    res.status(200).json({
      status: 'success',
      items: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.createCv = async (req, res, next) => {
  // console.log('req.body:\n' + JSON.stringify(req.body));
  try {
    const result = await models.cv.create({
      name: req.body.name,
      file: req.body.file,
    });
    // console.log('result:\n' + result);
    res.status(200).json({
      status: 'success',
      item: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.deleteCv = async (req, res, next) => {
  //console.log('DELETE\n' + JSON.stringify(req.params.id));
  try {
    const result = await models.cv.destroy({
      where: { name: req.params.id }, //TODO more keys
    });
    //console.log('remove result:\n' + JSON.stringify(result));
    if (result === 1) {
      res.status(200).json({
        status: 'success',
        name: req.params.id,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: `Item with name "${req.params.id}" missing`, //DEV
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};
