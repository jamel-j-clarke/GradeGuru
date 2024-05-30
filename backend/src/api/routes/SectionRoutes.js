const express = require('express');
const sectionRouter = express.Router();
const sectionDAO = require('../../model/dao/SectionDAO.js');

sectionRouter.use(express.json());
module.exports = sectionRouter;

const TokenMiddleware = require('../../middleware/TokenMiddleware.js');
const AuthorizationMiddleware = require('../../middleware/AuthorizationMiddleware.js');
const ShibbolethMiddleware = require('../../middleware/ShibbolethMiddleware.js');

sectionRouter.post('/', (req, res) => {
  let sectionId;
  let number = req.body.number;
  let courseId = req.body.courseId;
  if (!number) {
    res.status(403).json('Number field cannot be blank');
    return;
  }
  if (!courseId) {
    res.status(403).json('Course ID field cannot be blank');
    return;
  }

  sectionDAO
    .createSection(number, courseId)
    .then((id) => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

sectionRouter.get('/course/:id', (req, res) => {
  sectionDAO
    .getSectionsByCourse(req.params.id)
    .then((courseSections) => {
      if (!courseSections) throw new Error(`Error getting course sections`);
      return res.json(courseSections);
    })
    .catch((error) => {
      console.error(error);
      res.status(403).json(findErrorMessage(error));
    });
});

sectionRouter.delete('/:id', (req, res) => {
  sectionDAO
    .deleteSection(req.params.id)
    .then(() => {
      res.json({ success: 'Section deletesd' });
    })
    .catch((error) => {
      res.status(403).json(findErrorMessage(error));
    });
});
