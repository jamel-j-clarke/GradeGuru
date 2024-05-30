const express = require('express');
const assignmentRouter = express.Router();
const assignmentDAO = require('../../model/dao/AssignmentDAO.js');

assignmentRouter.use(express.json());
module.exports = assignmentRouter;

const TokenMiddleware = require('../../middleware/TokenMiddleware.js');
const AuthorizationMiddleware = require('../../middleware/AuthorizationMiddleware.js');
const ShibbolethMiddleware = require('../../middleware/ShibbolethMiddleware.js');

assignmentRouter.post('/', (req, res) => {
  let assignmentId;
  let name = req.body.name;
  let description = req.body.description;
  let courseId = req.body.courseId;
  let rubricId = req.body.rubricId;

  if (!name) {
    res.status(403).json('Name field cannot be blank');
    return;
  }
  if (!description) {
    res.status(403).json('Description field cannot be blank');
    return;
  }
  if (!courseId) {
    res.status(403).json('Course ID field cannot be blank');
    return;
  }
  if (!rubricId) {
    res.status(403).json('Rubric ID field cannot be blank');
    return;
  }
  assignmentDAO
    .createAssignment(name, description, courseId, rubricId)
    .then(({ insertId }) => {
      res.json({ success: insertId.toString() });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

assignmentRouter.get('/', (req, res) => {
  assignmentDAO.getAllAssignments().then((assignments) => {
    if (!assignments) throw new Error('Error getting assignments');
    return res.json(assignments);
  });
});

assignmentRouter.get('/:id', (req, res) => {
  const assignment = assignmentDAO.getAssignmentById(req.params.id);
  if (!assignment) throw new Error('Error getting assignment');
});

assignmentRouter.put('/:id', (req, res) => {
  let assignmentId = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  let courseId = req.body.courseId;
  let rubricId = req.body.rubricId;
  if (!name) {
    res.status(403).json('Name field cannot be blank');
    return;
  }
  if (!description) {
    res.status(403).json('Description field cannot be blank');
    return;
  }
  if (!courseId) {
    res.status(403).json('Course ID field cannot be blank');
    return;
  }
  if (!rubricId) {
    res.status(403).json('Rubric ID field cannot be blank');
    return;
  }
  assignmentDAO
    .updateAssignment(assignmentId, name, description, courseId, rubricId)
    .then(() => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

assignmentRouter.delete('/:id', (req, res) => {
  assignmentDAO
    .deleteAssignment(req.params.id)
    .then(() => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});
