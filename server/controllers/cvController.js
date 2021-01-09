const { models } = require('../models/sequelize');
const {
  parseAllCvItemsResponse,
  parseSelectedFileResponse,
  fileTypeFromName,
  bucketKeyCreator,
} = require('../utills/parseHelper.js');
const { uploadFile, clearBucket, deleteFile } = require('../utills/awsBucketHelper');

exports.getAllCv = async (req, res, next) => {
  try {
    const result = await models.cv.findAll({ raw: true });

    res.status(200).json({
      status: 'success',
      items: parseAllCvItemsResponse(result),
    });
  } catch (err) {
    //console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.getCv = async (req, res, next) => {
  try {
    const result = await models.cv.findByPk(req.params.id);
    // console.log('result:', JSON.stringify(result));
    res.status(200).json({
      status: 'success',
      item: parseSelectedFileResponse(result),
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
  try {
    if (!req.files) {
      res.status(500).json({ status: 'fail', message: 'File missing' });
      return;
    } else if (!req.body.name) {
      res.status(500).json({ status: 'fail', message: 'Name missing' });
      return;
    }
    const file = req.files.file;
    const name = req.body.name;
    const description = req.body.description;
    const type = fileTypeFromName(file.name);

    const rdsResult = await models.cv.create({
      name: name,
      description: description,
      file: '',
      type: type,
    });

    // console.log('rdsResult:\n', rdsResult);

    const s3Result = await uploadFile(file, name, '' + rdsResult.id);

    // Problem with upload to s3 bucket.Remove SQL instance
    if (!s3Result) {
      await models.cv.destroy({
        where: { id: rdsResult.id },
      });
      throw new Error('S3 update failed');
    }

    // console.log('s3Result:\n', s3Result);

    const updated = await models.cv.update({ file: s3Result.Location }, { where: { id: rdsResult.id } });

    //Problem with update SQL instance,Remove RDS and S3 instances.
    if (updated[0] === 0) {
      const key = bucketKeyCreator(name, rdsResult.id, type);
      deleteFile(key);
      models.cv.destroy({
        where: { id: rdsResult.id }, //TODO more keys
      });
      throw new Error('RDS update failed'); //DEV
    }
    //console.log('rdsResult:\n', rdsResult);

    res.status(200).json({
      status: 'success',
      data: {
        id: rdsResult.id,
        name: rdsResult.name,
        description: rdsResult.description,
        type: rdsResult.type,
        file: s3Result.Location,
      },
    });
  } catch (err) {
    //console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.deleteCv = async (req, res, next) => {
  try {
    const item = await models.cv.findByPk(req.params.id);
    // console.log('item delete:\n' + JSON.stringify(item));
    const key = bucketKeyCreator(item.name, item.id, item.type);
    const awsResult = await deleteFile(key);
    //console.log('aws result:\n' + JSON.stringify(awsResult));

    const result = await models.cv.destroy({
      where: { id: item.id }, //TODO more keys
    });

    if (result !== 0) {
      res.status(200).json({
        status: 'success',
        id: item.id,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: `Item with id "${item.id}" missing`, //DEV
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
