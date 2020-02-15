const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
var cors = require('cors');

app.use(cors());

const apiKey = process.env.GOOGLE_API_KEY;

let options = {
  concurrentLimit: 20,
  requestOptions: {},
};

const googleTranslate = require('google-translate')(apiKey, options);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/detect', async (req, res) => {
    return await googleTranslate.detectLanguage(req.query.language, function(err, detection) {
        // if unable to detect a language >> default to english
        
        if (!detection) {
            res.send('en');
        } else {
            res.send(detection.language);
        }
  });
})

app.get('/translate', async (req, res) => {
    return googleTranslate.translate(req.query.message, req.query.translation, async function (err, translation) {
                  let userMessage = await translation.translatedText;
                  if (userMessage.length > 1) {
                  res.send(userMessage);
                  }
        });
    });

app.listen(port, () => console.log(`Server listening on port ${port}!`))