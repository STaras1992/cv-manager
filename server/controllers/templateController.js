const { models } = require('../models/sequelize');
const { parseAllTemplatesResponse, parseTemplateResponse } = require('../utills/parseHelper');

exports.getAllTemplates = async (req, res, next) => {
  try {
    const resultItems = await models.template.findAll({ raw: true });

    res.status(200).json({
      status: 'success',
      items: parseAllTemplatesResponse(resultItems),
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.createTemplate = async (req, res, next) => {
  try {
    const resultItem = await models.template.create({
      name: req.body.name,
      description: req.body.description,
      cv: req.body.cv,
      cover: req.body.cover,
    });

    res.status(200).json({
      status: 'success',
      item: parseTemplateResponse(resultItem),
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.deleteTemplate = async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const result = await models.template.destroy({
      where: { id: reqId },
    });
    if (result !== 0) {
      res.status(200).json({
        status: 'success',
        id: reqId,
      });
      console.log(`Template with id ${reqId} deleted succesfully`);
      return;
    } else {
      res.status(404).json({
        status: 'fail',
        message: `Template ${reqId} is missing`, //DEV
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

exports.updateTemplate = async (req, res, next) => {
  try {
    const { id, name, description, cv, cover } = req.body;
    const updated = await models.template.update(
      { name: name, description: description, cv: cv, cover: cover },
      { where: { id: id } }
    );

    if (updated !== 0) {
      const updatedItem = parseTemplateResponse(await models.template.findByPk(id));
      res.status(200).json({
        status: 'success',
        item: updatedItem,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: "Template is missing or can't update",
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
