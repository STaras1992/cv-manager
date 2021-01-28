const { models } = require('../models/sequelize');
const { parseAllTemplatesResponse, parseTemplateResponse } = require('../utills/parseHelper');
const { isTemplateExist } = require('../utills/dbHelper');

exports.getAllTemplates = async (req, res, next) => {
  try {
    const resultItems = await models.template.findAll({ where: { userId: req.body.userId } }, { raw: true });

    if (resultItems.length === 0) {
      res.status(200).json({
        status: 'success',
        items: [],
      });
      return;
    }

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
    if (await isTemplateExist(req.body.name, req.body.userId)) {
      res.status(409).json({
        status: 'fail',
        message: `'${req.body.name}' already used.Please try different name`,
      });
      return;
    }

    const user = await models.user.findByPk(req.body.userId);

    if (!user) {
      res.status(401).json({ status: 'fail', message: `User not found, try login again` });
      return;
    }

    const resultItem = await user.createTemplate({
      name: req.body.name,
      description: req.body.description,
      cv: req.body.cv,
      cover: req.body.cover,
    });

    if (resultItem) {
      res.status(201).json({
        status: 'success',
        item: parseTemplateResponse(resultItem),
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

exports.deleteTemplate = async (req, res, next) => {
  try {
    const reqId = req.params.id;

    const result = await models.template.destroy({
      where: { id: reqId, userId: req.body.userId },
    });
    if (result !== 0) {
      res.status(200).json({
        status: 'success',
        id: reqId,
      });
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

    if (await isTemplateExist(name, req.body.userId, id)) {
      res.status(409).json({
        status: 'fail',
        message: `'${name}' already used.Please try different name`,
      });
      return;
    }

    const updated = await models.template.update(
      { name: name, description: description, cv: cv, cover: cover },
      { where: { id: id, userId: req.body.userId } }
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
