const { S3 } = require('../database/aws');
const contentDisposition = require('content-disposition');
const { fileTypeFromName, bucketKeyCreator } = require('./parseHelper.js');

exports.uploadFile = async (file, fileName, id) => {
  const type = fileTypeFromName(file.name);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: bucketKeyCreator(fileName, id, type), // File name you want to save as in S3
    Body: file.data,
    ContentType: file.mimetype,
    ContentDisposition: contentDisposition(file.name),
    ACL: 'public-read',
  };

  // Uploading files to the bucket
  const promise = await new Promise((resolve, reject) => {
    S3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
      // try {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log(`File uploaded successfully`);
      //   temp = data;
      // } catch (err) {
      //   console.log(`File failed to upload\n` + err);
      //   throw new Error(err.message);
      // }
    });
  });
  return promise;
};

exports.deleteFile = (key) => {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  S3.deleteObject(deleteParams, (err, data) => {
    try {
      if (err) {
        throw err;
      }
      console.log(`File deleted successfully. ${JSON.stringify(data)}`);
    } catch (err) {
      console.log(`File failed to delete\n` + err);
    }
  });
};

exports.emptyFolder = async (dir = '') => {
  const listParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: dir,
  };

  // console.log('listParams:\n' + JSON.stringify(listParams));

  const listedObjects = await S3.listObjectsV2(listParams).promise();
  // console.log('listedObjects:\n' + JSON.stringify(listedObjects));

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await S3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await module.exports.emptyFolder(dir);
  else {
    dir === '' ? console.log('Bucket cleared succesfully') : console.log(`Directory ${dir} cleared succesfully`);
  }
};

exports.clearBucket = () => {
  module.exports.emptyFolder();
};