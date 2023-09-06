const AWS = require("aws-sdk");
const config = require("./index");

AWS.config.update({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion,
});

const s3 = new AWS.S3();
module.exports = s3;
