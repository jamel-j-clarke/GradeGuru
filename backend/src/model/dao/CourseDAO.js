const db = require('../db/DBConnection');
const Course = require('../models/Course');
const Section = require('../models/Section');
const RubricDAO = require('./RubricDAO');
const SectionDAO = require('./SectionDAO');

module.exports.createCourse = function createCourse(
  sbj,
  num,
  title,
  credits,
  semesterId,
) {
  return db.query(
    'INSERT INTO course (crs_sbj, crs_num, crs_title, num_credits, crs_sem_id) VALUES (?, ?, ?, ?, ?)',
    [sbj, num, title, credits, semesterId],
    (error, results, fields) => {
      return results.insertId.toString();
    },
  );
};

module.exports.getCourseById = function getCourseById(courseId) {
  return db
    .query('SELECT * FROM course WHERE crs_id=?', [courseId])
    .then((results) => {
      return new Course(results[0]);
    });
};

module.exports.getCourseByName = function getCourseByName(prefix, number) {
  return db
    .query('SELECT * FROM course WHERE crs_sbj=? AND crs_num=?', [
      prefix,
      number,
    ])
    .then((results) => {
      if (results[0]) return new Course(results[0]);
    });
};

module.exports.getCourse = function getCourse(prefix, number) {
  return db
    .query('SELECT * FROM course WHERE crs_sbj=? AND crs_num=?', [
      prefix,
      number,
    ])
    .then((results) => {
      if (results[0]) return results[0];
    });
};

module.exports.getAllCourses = function getAllCourses() {
  return db.query('SELECT * FROM course').then((courses) => {
    return courses.map((course) => new Course(course));
  });
};

module.exports.deleteAllCourses = function deleteAllCourses() {
  db.query('SELECT crs_id FROM course')
    .then((results) => {
      const courseIds = results.map((row) => row.crs_id);
      const deleteCourses = courseIds.map((courseId) =>
        deleteSection(courseId),
      );
      return Promise.all(deleteCourses);
    })
    .then(() => {
      //console.log('All courses deleted');
    })
    .catch((error) => {
      throw Error('Error deleting courses:');
    });
};

module.exports.deleteAllCoursesT = function deleteAllCoursesT() {
  return db.query('DELETE FROM course');
};

module.exports.deleteCourse = function deleteCourse(courseId) {
  return db
    .query(
      'SELECT * FROM rubric WHERE rub_type = "course" AND crs_id = ?',
      [courseId],
      (error, results, fields) => {
        if (results) {
          const rubricIds = results.map((row) => row.rub_id);
          const deleteRubrics = rubricIds.map((rubricId) =>
            RubricDAO.deleteRubric(rubricId),
          );
          Promise.all(deleteRubrics);
        }
      },
    )
    .then(() => {
      return db.query(
        'SELECT * FROM section WHERE sec_crs_id = ?',
        [courseId],
        (error, results, fields) => {
          if (results) {
            const sectionIds = results.map((row) => row.sec_id);
            const deleteSections = sectionIds.map((sectionId) =>
              SectionDAO.deleteSection(sectionId),
            );
            Promise.all(deleteSections);
          }
        },
      );
    })
    .then(() => {
      return db.query('DELETE FROM course WHERE crs_id = ?', [courseId]);
    });
};

module.exports.getCourseSectionByNumber = function getCourseSectionByNumber(
  courseId,
  sectionNumber,
) {
  return db
    .query('SELECT * FROM section WHERE sec_crs_id=? AND sec_number=?', [
      courseId,
      sectionNumber,
    ])
    .then((results) => {
      if (results[0]) return new Section(results[0]);
    });
};
