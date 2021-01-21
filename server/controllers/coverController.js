const { models } = require('../models/sequelize');
const { parseCoverResponse, parseAllCoversResponse } = require('../utills/parseHelper');
const { isCoverExist } = require('../utills/dbHelper');

exports.getAllCovers = async (req, res, next) => {
  try {
    const resultItems = await models.cover.findAll({ raw: true });
    res.status(200).json({
      status: 'success',
      items: parseAllCoversResponse(resultItems),
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
    console.log(req.body);
    if (await isCoverExist(req.body.name)) {
      res.status(409).json({
        status: 'fail',
        message: `Current cover name already exist`,
      });
      return;
    }
    const resultItem = await models.cover.create({
      name: req.body.name,
      content: req.body.content,
    });

    console.log(`Cover ${resultItem.id} created`);

    res.status(201).json({
      status: 'success',
      item: parseCoverResponse(resultItem),
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.getCover = async (req, res, next) => {
  try {
    const result = await models.cover.findByPk(req.params.id);
    if (result) {
      res.status(200).json({
        status: 'success',
        item: parseCoverResponse(result),
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Selected cover letter is missing',
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

exports.deleteCover = async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const result = await models.cover.destroy({
      where: { id: reqId },
    });
    if (result !== 0) {
      res.status(200).json({
        status: 'success',
        id: reqId,
      });
      console.log(`Cover with id ${reqId} deleted succesfully`);
      return;
    } else {
      res.status(404).json({
        status: 'fail',
        message: `Cover is missing`, //DEV
      });
      return;
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.updateCover = async (req, res, next) => {
  try {
    const { id, name, content } = req.body;
    const updated = await models.cover.update({ name: name, content: content }, { where: { id: id } });

    if (updated !== 0) {
      const updatedItem = parseCoverResponse(await models.cover.findByPk(id));
      res.status(200).json({
        status: 'success',
        item: updatedItem,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        item: 'File is missing',
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
