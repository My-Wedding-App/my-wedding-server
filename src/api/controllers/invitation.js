const Invitation = require('../models/invitaion');


/**
 * add new invitation
 * @param {Request} req 
 * @param {Response} res 
 */
const addInvitation = async (req, res) => {
  const invitation = new Invitation({
    code: req.body.code,
    category: req.body.category,
    title: req.body.title,
    name: req.body.name
  });

  const result = await invitation.save()
    .then(() => {
      return true;
    })
    .catch(err => {
      console.log('Error in adding invitation', err);
      return false;
    })
  
  return result;
};

/**
 * get invitation
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getInvitationById = function(req, res) {
  console.log(req);
  res.json({
    id: 5
  })
}

module.exports = {
  addInvitation
}
