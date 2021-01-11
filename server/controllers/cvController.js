const { models } = require('../models/sequelize');
const {
  parseAllCvItemsResponse,
  parseSingleCvResponse,
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
      item: parseSingleCvResponse(result),
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

    const s3Result = await uploadFile(file, name, '' + rdsResult.id);

    // Problem with upload to s3 bucket.Remove SQL instance
    if (!s3Result) {
      await models.cv.destroy({
        where: { id: rdsResult.id },
      });
      throw new Error('S3 update failed');
    }

    const updated = await models.cv.update({ file: s3Result.Location }, { where: { id: rdsResult.id } });

    if (updated[0] === 0) {
      const key = bucketKeyCreator(name, rdsResult.id, type);
      deleteFile(key);
      models.cv.destroy({
        where: { id: rdsResult.id },
      });
      throw new Error('RDS update failed'); //DEV
    }

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
    console.log(err.message);
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};

exports.deleteCv = async (req, res, next) => {
  try {
    const item = await models.cv.findByPk(req.params.id);
    const key = bucketKeyCreator(item.name, item.id, item.type);
    const awsResult = await deleteFile(key);

    const result = await models.cv.destroy({
      where: { id: item.id },
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

exports.updateCv = async (req, res, next) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    let type = null;
    let file = null;
    console.log(JSON.stringify(req.body));

    //File alredy exist in db.file is link to doc.
    if (!req.files) {
      file = req.body.file;
      type = fileTypeFromName(file);
    }
    //New file,rewrite with same key new file and get link.
    else {
      file = req.files.file;
      const s3Result = await uploadFile(file, name, '' + id); // TODO check  without '' +
      if (s3Result) {
        type = fileTypeFromName(file.name);
        file = s3Result.Location;
      } else {
        throw new Error('Faile to upload new file to S3 bucket');
      }
    }

    const updated = await models.cv.update(
      { description: description, name: name, type: type, file: file },
      { where: { id: id } }
    );

    if (updated !== 0) {
      const updatedItem = parseSingleCvResponse(await models.cv.findByPk(id));
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
    res.status(500).json({
      status: 'fail',
      message: err.message, //DEV
    });
  }
};
