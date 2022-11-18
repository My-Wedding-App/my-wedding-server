const express = require('express');

const app = express();

const port = 8000

app.listen(process.env.PORT || port, () => {
  console.log('Listening ... 8000')
})

app.get('/', (req, res) => {
  res.send('Hello');
})