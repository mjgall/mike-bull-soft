const AWS = require('aws-sdk');
const path = require('path');
const atob = require('atob');

module.exports = data => {
  return new Promise((resolve, reject) => {
    try {
      const jsonPath = path.join(__dirname, '..', 'config', 'aws_key.json');

      AWS.config.loadFromPath(jsonPath);

      const s3 = new AWS.S3();

      let buf = new Buffer(
        data.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
    //   function dataURItoBlob(dataURI) {
    //     var binary = atob(dataURI.split(',')[1]);
    //     var array = [];
    //     for(var i = 0; i < binary.length; i++) {
    //         array.push(binary.charCodeAt(i));
    //     }
    //     console.log(array);
    //     return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    // }
    
    // dataURItoBlob(data);

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
