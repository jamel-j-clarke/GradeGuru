const db = require('../db/DBConnection');
const Assignment = require('../models/Assignment');

module.exports.createAssignment = function createAssignment(
  name,
  description,
  sectionId,
  rubricId,
) {
  return db.query(
    'INSERT INTO assignment (assign_name, assign_desc, sec_id, rub_id) VALUES (?, ?, ?, ?)',
    [name, description, sectionId, rubricId],
    (error, results, fields) => {
      return results.insertId.toString();
    },
  );
};

module.exports.getAssignmentById = function getAssignmentById(assignmentId) {
  return db
    .query('SELECT * FROM assignment WHERE assign_id=?', [assignmentId])
    .then((results) => {
      return new Assignment(results[0]);
    });
};

module.exports.getAssignmentsBySection = function getAssignmentsBySection(
  sectionId,
) {
  return db
    .query('SELECT * FROM assignment WHERE sec_id=?', [sectionId])
    .then((results) => {
      return results.map((assignment) => new Assignment(assignment));
    });
};

module.exports.getAllAssignments = function getAllAssignments() {
  return db.query('SELECT * FROM assignment').then((assignments) => {
    return assignments;
  });
};

module.exports.deleteAllAssignmentsT = function deleteAllAssignmentsT() {
  return db.query('DELETE FROM assignment');
};

module.exports.deleteAssignment = function deleteAssignment(assignmentId) {
  return db.query('DELETE FROM assignment WHERE assign_id=?', [assignmentId]);
};

module.exports.updateAssignment = function updateAssignment(
  assignmentId,
  name,
  description,
  sectionId,
  rubricId,
) {
  return db.query(
    'UPDATE assignment SET assign_name=?, assign_desc=?, sec_id=?, rub_id=? WHERE assign_id=?',
    [name, description, sectionId, rubricId, assignmentId],
  );
};
module.exports.deleteAllAssignmentsByRubric = function deleteAllAssignmentsByRubric(rubricId) {
    return db.query('DELETE FROM assignment WHERE rub_id=?', [rubricId]);
  };
