const invitation = require('../controllers/invitation.js');


module.exports = function(app) {
  // Invitation Routes
  
  app.route('/invitation/:invitationId')
    .get(invitation.getInvitationById)
    .post(invitation.addInvitation);
};
