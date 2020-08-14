'use strict';
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event,context, callback) => {
    const data = JSON.parse(event.body);
    if( data.text && typeof data.text!=='string'){
      callback(new Error('Body did not contain a text property.'));
      return;
    }
    const params = {
      TableName: 'BlogTable',
      Item:{
        article_id:"1",
        text: data.text
      },
    };

    const putCallback = (error, result) => {
      if(error){
        console.error(error);
        callback(new Error('could not save record.'));
        return;
      }
      console.log(result);
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    }

    dynamodb.put(params, putCallback);

};
