const { models } = require('../models/sequelize');

exports.getAllCovers = async (req, res, next) => {
  try {
    const result = await models.cover.findAll({ raw: true });

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

exports.createCover = async (req, res, next) => {
  try {
    const result = await models.cover.create({
      name: req.body.name,
      content: req.body.content,
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

exports.deleteCover = async (req, res, next) => {
  try {
    const result = await models.cover.destroy({
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
