const AWS = require('aws-sdk');
const path = require('path');
const atob = require('atob');

module.exports = data => {
  return new Promise((resolve, reject) => {
    try {
      // const jsonPath = path.join(__dirname, '..', 'config', 'aws_key.json');
      // AWS.config.loadFromPath(jsonPath);
      AWS.config.update({ accessKeyId: keys.accessKeyId, secretAccessKey: keys.secretAccessKey, region: keys.region })

      const s3 = new AWS.S3();

      let buf = new Buffer(
        data.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      let s3Params = {
        Body: buf,
        Bucket: 'elasticbeanstalk-us-west-2-333773983209',
        Key: `${Date.now() + Math.floor(Math.random() * 100)}.png`,
        ACL: 'public-read',
      };

      s3.upload(s3Params, function(err, data) {
        if (err) {
          reject(err.message);
        } else {
          resolve(data.Location);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
