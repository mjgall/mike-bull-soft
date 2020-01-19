const AWS = require('aws-sdk');
const path = require('path');
const util = require('util');

module.exports = (recipientAddress, subject, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const jsonPath = path.join(__dirname, '..', 'config', 'aws_key.json');

      AWS.config.loadFromPath(jsonPath);

      const sender = 'mike@michaeljamesgallagher.com';

      const recipient = recipientAddress;

      // const configuration_set = "ConfigSet";

      const body_text = body;

      const body_html = body;

      const charset = 'UTF-8';

      const ses = new AWS.SES();

      const params = {
        Source: sender,
        Destination: {
          ToAddresses: [recipient]
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: charset
          },
          Body: {
            Text: {
              Data: body_text,
              Charset: charset
            },
            Html: {
              Data: body_html,
              Charset: charset
            }
          }
        }
        // ConfigurationSetName: configuration_set
      };

      // Try to send the email.
      ses.sendEmail(params, function(err, data) {
        // If something goes wrong, print an error message.
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          console.log('Email sent! Message ID: ', data.MessageId);
          resolve(data.MessageId);
        }
      });
    } catch (error) {
      reject();
      console.log(error);
      throw new Error(error);
    }
  });
};
