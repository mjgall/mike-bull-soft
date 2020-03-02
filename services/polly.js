const AWS = require('aws-sdk');
const path = require('path');
const keys = require('../config/keys')

//SHOULD BE USING AWS ENVIRONMENT VARIABLES FOR AWS AUTHENTICATION

module.exports = data => {
  return new Promise((resolve, reject) => {
    // const jsonPath = path.join(__dirname, '..', 'config', 'aws_key.json');
    // AWS.config.loadFromPath(jsonPath);

    AWS.config.update({ accessKeyId: keys.accessKeyId, secretAccessKey: keys.secretAccessKey, region: keys.region })

    const polly = new AWS.Polly();
    const s3 = new AWS.S3();

    const pollyparams = {
      Text: `<speak><prosody rate="85%">${data.text}</prosody></speak>`,
      TextType: 'ssml',
      OutputFormat: 'mp3'
    };

    switch (data.language) {
      case 'german':
        pollyparams.VoiceId = 'Hans';
        break;
      case 'spanish':
        pollyparams.VoiceId = 'Miguel';
        break;
      default:
        pollyparams.VoiceId = 'Amy';
        break;
    }

    polly.synthesizeSpeech(pollyparams, (err, data) => {
      if (err) {
        reject(err.message);
      } else if (data) {
        const date = Date.now();
        let s3params = {
          Body: data.AudioStream,
          Bucket: 'elasticbeanstalk-us-west-2-333773983209',
          Key: `${date}.mp3`,
          ACL: 'public-read'
        };

        s3.upload(s3params, function (err, data) {
          if (err) {
            reject(err.message);
          } else {
            resolve(data.Location);
          }
        });
      }
    });
  });
};
