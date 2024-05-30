const express = require('express');
const semesterRouter = express.Router();
const semesterDAO = require('../../model/dao/SemesterDAO.js');

semesterRouter.use(express.json());
module.exports = semesterRouter;

const TokenMiddleware = require('../../middleware/TokenMiddleware.js');
const AuthorizationMiddleware = require('../../middleware/AuthorizationMiddleware.js');
const ShibbolethMiddleware = require('../../middleware/ShibbolethMiddleware.js');

semesterRouter.post('/', (req, res) => {
  let semesterId;
  let year = req.body.year;
  let season = req.body.season;
  let active = req.body.active;
  if (!year) {
    res.status(403).json('Year field cannot be blank');
    return;
  }
  if (!season) {
    res.status(403).json('Season field cannot be blank');
    return;
  }
  if (active === undefined || active === null) {
    res.status(403).json('Active field cannot be blank');
    return;
  }

  semesterDAO
    .createSemester(year, season, active)
    .then((id) => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      console.error(error);
      res.status(403).json(findErrorMessage(error));
    });
});

semesterRouter.get('/', (req, res) => {
  semesterDAO
    .getAllSemesters()
    .then((semesters) => {
      res.json(semesters);
    })
    .catch((error) => {
      console.error(error);
      res.status(403).json(findErrorMessage(error));
    });
});

semesterRouter.get('/active', (req, res) => {
  semesterDAO
    .getActiveSemester()
    .then((activeSemester) => {
      res.json(activeSemester ? activeSemester : {});
    })
    .catch((error) => {
      console.error(`Semester Router: ${error}`);
      res.status(403).json(findErrorMessage(error));
    });
});

semesterRouter.get('/:id/courses', (req, res) => {
  semesterDAO
    .getSemesterCourses(req.params.id)
    .then((courses) => {
      res.json(courses);
    })
    .catch((error) => {
      res.status(403).json(findErrorMessage(error));
    });
});

semesterRouter.get('/:id', (req, res) => {
  semesterDAO
    .getSemesterById(req.params.id)
    .then((semester) => {
      res.json(semester);
    })
    .catch((error) => {
      console.error(error);
      res.status(403).json(findErrorMessage(error));
    });
});

semesterRouter.get('/:year/:season', (req, res) => {
  semesterDAO
    .getSemesterByName(req.params.year, req.params.season)
    .then((semester) => {
      res.json(semester);
    })
    .catch((error) => {
      console.error(error);
      res.status(403).json(findErrorMessage(error));
    });
});

semesterRouter.put('/:id', (req, res) => {
  let semesterId = req.params.id;
  let year = req.body.year;
  let season = req.body.season;
  let active = req.body.active;
  if (!year) {
    res.status(403).json('Year field cannot be blank');
    return;
  }
  if (!season) {
    res.status(403).json('Season field cannot be blank');
    return;
  }
  if (active === undefined || active === null) {
    res.status(403).json('Active field cannot be blank');
    return;
  }

  semesterDAO
    .updateSemester(semesterId, year, season, active)
    .then((id) => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

semesterRouter.delete('/:id', (req, res) => {
  semesterDAO
    .deleteSemester(req.params.id)
    .then((id) => {
      res.json({ success: 'success' });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

//Helper function to return error message if it exists
function findErrorMessage(error) {
  if (error.message) {
    return error.message;
  }
  return error;
}
