const db = require('../db/DBConnection');
const Section = require('../models/Section');
const RubricDAO = require('./RubricDAO');

module.exports.createSection = function createSection(number, courseId) {
  var id;
  return db.query(
    'INSERT INTO section (sec_number, sec_crs_id) VALUES (?, ?)',
    [number, courseId],
    (error, results, fields) => {
      id = results.insertId;
      return id;
    },
  );
};

module.exports.getSectionById = function getSectionById(sectionId) {
  return db
    .query('SELECT * FROM section WHERE sec_id=?', [sectionId])
    .then((results) => {
      return new Section(results[0]);
    });
};

module.exports.getSectionsByCourse = function getSectionByCourseId(courseId) {
  return db
    .query('SELECT * FROM section WHERE sec_crs_id=?', [courseId])
    .then((results) => {
      return results.map((section) => new Section(section));
    });
};

module.exports.getAllSections = function getAllSections() {
  return db.query('SELECT * FROM section');
};

module.exports.deleteAllSections = function deleteAllSections() {
  db.query('SELECT sec_id FROM section')
    .then((results) => {
      const sectionIds = results.map((row) => row.sec_id);
      const deleteSections = sectionIds.map((sectionId) =>
        deleteSection(sectionId),
      );
      return Promise.all(deleteSections);
    })
    .then(() => {
      //console.log('All sections deleted');
    })
    .catch((error) => {
      throw Error("Error deleting sections:");
    });
};
module.exports.deleteAllSectionsT = function deleteAllSectionsT() {
    return db.query('DELETE FROM section');
};

module.exports.deleteSection = function deleteSection(sectionId) {
  return db.query('SELECT * FROM rubric WHERE rub_type = "section" AND sec_id = ?', [
    sectionId,
  ])
    .then((rubrics) => {
      const deleteRubrics = rubrics.map((rubric) =>
        RubricDAO.deleteRubric(rubric.rub_id),
      );
    })
    .then(() => {
      return db.query('DELETE FROM section WHERE sec_id = ?', [sectionId]);
    });
};
