const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {

  const { message } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `${message}` },
    ]
  });

  res.json({
    completion: completion.data.choices[0].message
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

