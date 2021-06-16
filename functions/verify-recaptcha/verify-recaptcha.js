const fetch = require('node-fetch');
require('dotenv').config()

exports.handler = async (event, context) => {

  const payload = JSON.parse(event.body);
  const { recaptchaValue } = payload;
  const SERVER_KEY = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;

  const API_ENDPOINT = `https://www.google.com/recaptcha/api/siteverify?secret=${SERVER_KEY}&response=${recaptchaValue}`;

  return fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch((error) => ({
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }));
};


