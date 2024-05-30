const db = require('../db/DBConnection');
const Semester = require('../models/Semester');
const CourseDAO = require('./CourseDAO');

module.exports.createSemester = function createSemester(year, season, active) {
  return db.query(
    'INSERT INTO semester (sem_year, sem_season, sem_active) VALUES (?, ?, ?)',

    [year, season, active],
    (error, results, fields) => {
      return results.insertId.toString();
    },
  );
};

module.exports.getSemesterById = function getSemesterById(semesterId) {
  return db
    .query('SELECT * FROM semester WHERE sem_id=?', [semesterId])
    .then((results) => {
      return new Semester(results[0]);
    });
};

module.exports.getSemester = function getSemester(
  semesterYear,
  semesterSeason,
) {
  return db
    .query('SELECT * FROM semester WHERE sem_year=? AND sem_season=?', [
      semesterYear,
      semesterSeason,
    ])
    .then((results) => {
      if (results[0]) return new Semester(results[0]);
    });
};

module.exports.getActiveSemester = function getActiveSemester() {
  return db
    .query('SELECT * FROM semester WHERE sem_active=true')
    .then((activeSemester) => {
      if (activeSemester[0]) return new Semester(activeSemester[0]);
    });
};

module.exports.getAllSemesters = function getAllSemesters() {
  return db
    .query('SELECT * FROM semester WHERE sem_id!=0')
    .then((semesters) => {
      return semesters.map((semester) => new Semester(semester));
    });
};

module.exports.updateSemester = function updateSemester(
  semesterId,
  year,
  season,
  active,
) {
  return db.query(
    'UPDATE semester SET sem_year=?, sem_season=?, sem_active=? WHERE sem_id=?',
    [year, season, active, semesterId],
    (error, results, fields) => {
      return results;
    },
  );
};

module.exports.deleteAllSemestersT = function deleteAllSemestersT() {
  return db.query('DELETE FROM semester');
};

module.exports.deleteSemester = function deleteSemester(semesterId) {
  return db
    .query(
      'SELECT * FROM course WHERE crs_sem_id=?',
      [semesterId],
      (error, results, fields) => {
        const courses = results;
        const deleteCourses = courses.map((course) => {
          CourseDAO.deleteCourse(course.crs_id);
        });
        Promise.all(deleteCourses);
      },
    )
    .then(() => {
      return db.query(
        'DELETE FROM semester WHERE sem_id=?',
        [semesterId],
        (error, results, fields) => {
          results;
        },
      );
    });
};

module.exports.getSemesterCourses = function getSemesterCourses(semesterId) {
  return db.query(
    'SELECT * FROM course WHERE crs_sem_id=?',
    [semesterId],
    (error, results, fields) => {
      return results;
    },
  );
};
