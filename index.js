const PORT = 8000
const axios = require('axios').default
const express = require('express')
require('dotenv').config()

const app = express()

app.get('/word', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '5', wordLength: '5' },
    headers: {
      'x-rapidapi-host': 'random-words5.p.rapidapi.com',
      'x-rapidapi-key': process.env.RANDOM_WORDS_API,
    },
  }

  axios
    .request(options)
    .then((response) => {
      res.json(response.data[0])
    })
    .catch((error) => {
      console.error(error)
    })
})

app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
