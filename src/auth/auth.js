const jwt = require('jsonwebtoken')


const ensureToken = (req, res, next) => {

  var bearerHeader = req.headers["authorization"]

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    jwt.verify(bearerToken, 'secretkey', (err, result) => {
      if(err) { res.sendStatus(403) }
      else{ next() }
    });
  } else {
    res.sendStatus(403)
  }
}

const generateToken = (req, res, next) => {

  const code = req.body.code

  if(code){
    const token = jwt.sign(
      { code: code }, 
      '552894622152',
      (err, token) => {
        res.send({
          ok: true,
          message: "successful"
        })
      })
  } else {
    res.send({
    ok: false,
    message: "Username or password incorrect"
    })
  }
}

module.exports = {
  ensureToken,
  generateToken,
}