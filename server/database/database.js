const { Sequelize } = require('sequelize');
// const sequelize = require('../models/sequelize');
const { applyExtraSetup } = require('../models/extra-setup');

let cvTable = require('../models/cv.model');
let coverTable = require('../models/cover.model');
let templateTable = require('../models/template.model');

const init = (sequelize) => {
  cvTable = cvTable(sequelize);
  coverTable = coverTable(sequelize);
  templateTable = templateTable(sequelize);

  applyExtraSetup(sequelize);
};

module.exports = { cvTable, coverTable, templateTable, init };
