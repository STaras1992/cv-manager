const { models } = require('../models/sequelize');
const { parseCoverResponse, parseAllCoversResponse } = require('../utills/parseHelper');
const { isCoverExist } = require('../utills/dbHelper');

exports.getAllCovers = async (req, res, next) => {
  try {
    const resultItems = await models.cover.findAll({ where: { userId: req.body.userId } }, { raw: true });
    console.log(resultItems);
    if (resultItems.length === 0) {
      res.status(200).json({
        status: 'success',
        items: [],
      });
      return;
    }

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
    if (await isCoverExist(req.body.name, req.body.userId)) {
      res.status(409).json({
        status: 'fail',
        message: `'${req.body.name}' already used.Please try different name`,
      });
      return;
    }

    const user = await models.user.findByPk(req.body.userId);

    if (!user) {
      res.status(404).json({ status: 'fail', message: `User not found, try login again` });
      return;
    }

    const resultItem = await user.createCover({
      name: req.body.name,
      content: req.body.content,
    });

    // const resultItem = await models.cover.create({
    //   name: req.body.name,
    //   content: req.body.content,
    // });

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
    // const result = await models.cover.findByPk(req.params.id);
    const result = await models.cover.findOne({ where: { id: req.params.id, userId: req.body.userId } });

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
      where: { id: reqId, userId: req.body.userId },
    });

    if (result !== 0) {
      res.status(200).json({
        status: 'success',
        id: reqId,
      });
      console.log(`Cover with id ${reqId} deleted succesfully`);
    } else {
      res.status(404).json({
        status: 'fail',
        message: `Cover is missing`, //DEV
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

exports.updateCover = async (req, res, next) => {
  try {
    const { id, name, content } = req.body;

    if (await isCoverExist(name, req.body.userId)) {
      res.status(409).json({
        status: 'fail',
        message: `'${name}' already used.Please try different name`,
      });
      return;
    }

    const updated = await models.cover.update(
      { name: name, content: content },
      { where: { id: id, userId: req.body.userId } }
    );

    if (updated !== 0) {
      const updatedItem = parseCoverResponse(await models.cover.findByPk(id));
      res.status(200).json({
        status: 'success',
        item: updatedItem,
      });
      console.log(`Cover with id ${id} updated succesfully`);
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'File is missing',
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
