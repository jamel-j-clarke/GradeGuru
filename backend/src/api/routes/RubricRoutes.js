const express = require('express');
const rubricRouter = express.Router();
const rubricDAO = require('../../model/dao/RubricDAO.js');

rubricRouter.use(express.json());

const TokenMiddleware = require('../../middleware/TokenMiddleware.js');
const AuthorizationMiddleware = require('../../middleware/AuthorizationMiddleware.js');
const ShibbolethMiddleware = require('../../middleware/ShibbolethMiddleware.js');

//Creates a new rubric
rubricRouter.post('/', (req, res) => {
  let rubricId;
  let name = req.body.name;
  let courseId = req.body.courseId;
  let type = req.body.type;
  let sectionId = req.body.sectionId;
  if (!name) {
    res.status(403).json('Name field cannot be blank');
    return;
  }
  if (type !== 'course' && type !== 'section') {
    res.status(403).json("Type must be either 'course' or 'section'");
    return;
  }
  if (type === 'course' && !courseId) {
    res.status(403).json('Course ID field cannot be blank');
    return;
  }
  if (type === 'section' && !sectionId) {
    res.status(403).json('Section ID field cannot be blank');
    return;
  }
  rubricDAO
    .createRubric(name, courseId, type, sectionId)
    .then(({ insertId }) => {
      res.json({ success: insertId.toString() });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

//Gets all rubrics
rubricRouter.get('/', (req, res) => {
  rubricDAO
    .getAllRubrics()
    .then((rubrics) => {
      res.json(rubrics);
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

//Gets all rubrics by course
rubricRouter.get('/courses/:id', (req, res) => {
  rubricDAO
    .getAllRubricsByCourse(req.params.id)
    .then((rubrics) => {
      res.json(rubrics);
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

//Gets all rubrics by section
rubricRouter.get('/sections/:id', (req, res) => {
  rubricDAO
    .getAllRubricsBySection(req.params.id)
    .then((rubrics) => {
      res.json(rubrics);
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

//Gets a specific rubric by ID
rubricRouter.get('/:rubricId', (req, res) => {
  rubricDAO
    .getRubricById(req.params.rubricId)
    .then((rubric) => {
      res.json(rubric);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json('Not found: Error ' + findErrorMessage(error));
    });
});

//Deletes a specific rubric by id
rubricRouter.delete('/:rubricId', (req, res) => {
  rubricDAO
    .deleteRubric(req.params.rubricId)
    .then(() => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      res.status(404).json('Not found: Error ' + findErrorMessage(error));
    });
});

//edits the name of a given rubric
rubricRouter.patch('/:rubricId', (req, res) => {
  rubricDAO
    .editRubric(req.params.rubricId, req.body.name)
    .then((res) => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      res.status(404).json('Not found: Error ' + findErrorMessage(error));
    });
});

module.exports = rubricRouter;

//Helper function to return error message if it exists
function findErrorMessage(error) {
  if (error.message) {
    return error.message;
  }
  return error;
}
