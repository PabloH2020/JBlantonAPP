const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env.MY_OPENAI_API_KEY
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/chat', async (req, res) => {
  const { prompt } = req.body
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
    // res.send(response.data.choices[0].text)
    res.send(response)
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status) // e.g. 401
      console.error(error.message) // e.g. The authentication token you passed was invalid...
      console.error(error.code) // e.g. 'invalid_api_key'
      console.error(error.type) // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error)
    }
  }
})

const port = 8000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
