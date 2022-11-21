const express = require('express');
const app = express();
const routes = require('./api/routes/invitation');
const { mongoose } = require('mongoose');
const { dbUrl } = require('./config/db-config');
const { urlencoded, json } = require('body-parser')

const port = 8000
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())

mongoose.connect(dbUrl)
  .then(
    app.listen(process.env.PORT || port, () => {
      console.log('Listening ... 9000')
    })
  )
  .catch(err => {
    console.log(err);
  })

app.use('/health', require('express-healthcheck')({
  healthy: function () {
    return { message: 'ExpressJS web service is up and running' };
  }
}));

app.use('/', routes);
