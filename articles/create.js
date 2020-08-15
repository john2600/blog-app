'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.authorName !== 'string' || typeof data.title !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the article item.'));
    return;
  }

  const params = {
    TableName: 'BlogTable',
    Item: {
      id: uuid.v1(),
      petName: data.authorName,
      petBreed: data.title,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the pet to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the article item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
