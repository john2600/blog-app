'use strict';

module.exports.handler = async (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'delete Article.'
      }),
    };
    callback(null, response);
};
