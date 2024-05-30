const express = require('express');
const courseRouter = express.Router();
const courseDAO = require('../../model/dao/CourseDAO.js');

courseRouter.use(express.json());
module.exports = courseRouter;

const TokenMiddleware = require('../../middleware/TokenMiddleware.js');
const AuthorizationMiddleware = require('../../middleware/AuthorizationMiddleware.js');
const ShibbolethMiddleware = require('../../middleware/ShibbolethMiddleware.js');

//Creates a new rubric
courseRouter.post('/', (req, res) => {
  let courseId;
  let subject = req.body.subject;
  let courseNumber = req.body.courseNumber;
  let title = req.body.title;
  let credits = req.body.credits;
  let semesterId = req.body.semesterId;
  if (!subject) {
    res.status(403).json('Subject field cannot be blank');
    return;
  }
  if (!courseNumber) {
    res.status(403).json('Course Number field cannot be blank');
    return;
  }
  if (!title) {
    res.status(403).json('Title field cannot be blank');
    return;
  }
  if (!credits) {
    res.status(403).json('Credits field cannot be blank');
    return;
  }
  if (!semesterId) {
    res.status(403).json('Semester ID field cannot be blank');
    return;
  }
  courseDAO
    .createCourse(subject, courseNumber, title, credits, semesterId)
    .then(({ insertId }) => {
      res.json({ success: insertId.toString() });
    })
    .catch((error) => {
      console.log(error);
      res.status(403).json(findErrorMessage(error));
    });
});

courseRouter.get('/:prefix/:number', (req, res) => {
  courseDAO
    .getCourseByName(req.params.prefix, req.params.number)
    .then((course) => {
      if (!course) throw new Error('Error getting course by name');
      return res.json(course);
    });
});

courseRouter.get('/:id/sections/:sectionNumber', (req, res) => {
  courseDAO
    .getCourseSectionByNumber(req.params.id, req.params.sectionNumber)
    .then((courseSection) => {
      if (!courseSection)
        throw new Error(`Error getting course section by number`);
      return res.json(courseSection);
    })
    .catch((error) => {
      console.error(error);
      res.status(403).json(findErrorMessage(error));
    });
});

//get all courses
courseRouter.get('/', (req, res) => {
  courseDAO.getAllCourses().then((courses) => {
    if (!courses) throw new Error('Error getting courses');
    return res.json(courses);
  });
});

courseRouter.get('/:id', (req, res) => {
  const course = courseDAO.getCourseById(req.params.id);
  if (!course) throw new Error('Error getting course');
  return res.json(course);
});

courseRouter.delete('/:id', (req, res) => {
  courseDAO
    .deleteCourse(req.params.id)
    .then(() => {
      res.json({ success: 'Course deleted' });
    })
    .catch((error) => {
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
