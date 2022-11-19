const mongoose = require('mongoose'),
Task = mongoose.model('Tasks');


/**
 * add new invitation
 * @param {Request} req 
 * @param {Response} res 
 */
exports.addInvitation = function(req, res) {
  const newInvitation = new Task(req.body);
  newInvitation.save(function(err, task) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(task);
    }
  });
};

/**
 * get invitation
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getInvitationById = function(req, res) {
  Task.findById(req.params.invitationID, function(err, invitation) {
    if (err) {
      res.status(404).send({ error: { errors: [ { domain: 'global', reason: 'notFound', message: 'Not Found', 
                            description: 'Couldn\'t find the requested invitationId \'' + req.params.invitationId + '\'' } ], err, code: 404 } })
    } else {
      res.json(invitation);
    }
  });
};
