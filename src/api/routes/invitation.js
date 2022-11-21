const { getInvitationById, addInvitation } = require('../controllers/invitation.js');
const express = require('express');
const router = express.Router();

router.get('/invite', (req, res, next) => {
  getInvitationById(req, res);
  console.log('get');
  next();
});

router.post('/invite', async (req, res, next) => {
  await addInvitation(req, res)
    .then(result => {
      if (result) {
        res.status(200).send();
      } else {
        console.log(result);
        res.status(400).send({ message: 'Code must be unique' });
      }
    })
    .catch(err =>  {
      console.log(err);
      res.status(500).send({ message: 'Internal server error' });
    }) ;
  res.end();
  next();
});
 
module.exports = router;
