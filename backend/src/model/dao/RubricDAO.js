const db = require('../db/DBConnection');
const Rubric = require('../models/Rubric');
const RubricCategory = require('../models/RubricCategory');
const RubricItem = require('../models/RubricItem');
const RubricItemDAO = require('./RubricItemDAO');
const AssignmentDAO = require('./AssignmentDAO');

module.exports.createRubric = function createRubric(
  name,
  courseId,
  type,
  sectionId,
) {
  var id;
  if (type !== 'course' && type !== 'section') {
    throw new Error('Incorrect Rubric Type');
  }
  return db.query(
    'INSERT INTO rubric (rub_name, crs_id, rub_type, sec_id) VALUES (?, ?, ?, ?)',
    [name, courseId, type, sectionId],
    (error, results, fields) => {
      id = results.insertId;
      return id.replace('n', '');
    },
  );
};

module.exports.deleteRubric = function deleteRubric(rubricId) {
  return AssignmentDAO.deleteAllAssignmentsByRubric(rubricId).then(() => {
    return RubricItemDAO.getRubricItemsByRubric(rubricId)
      .then((rubricItems) => {
        const noParentItems = rubricItems.filter((item) => item.parent_id === 0);
        noParentItems.forEach((item) => {
          RubricItemDAO.deleteRubricItem(item.item_id);
        });
        return db.query('DELETE FROM rubric WHERE rub_id = ?', [rubricId]);
      })
      .catch((error) => {
        throw Error('Error deleting rubric:');
      });
  });
};

module.exports.duplicateRubric = function duplicateRubric(rubricId) {
    return db.query(
        'INSERT INTO rubric (rub_name, crs_id, rub_type) SELECT rub_name, crs_id, rub_type FROM rubric WHERE rub_id=?',
        [rubricId]
    )
    .then((results) => {
        const newRubricId = results.insertId;
        return db.query(
            'INSERT INTO item (item_name, item_desc, item_wgt, available_pts, rub_id, parent_id) SELECT item_name, item_desc, item_wgt, available_pts, ?, parent_id FROM item WHERE rub_id=? AND parent_id=0',
            [newRubricId, rubricId]
        );
    })
    .then(() => {
        return db.query(
            'SELECT item_id FROM item WHERE rub_id=? AND parent_id=0',
            [newRubricId]
        );
    })
    .then((results) => {
        const itemIds = results.map((row) => row.item_id);
        return duplicateItems(itemIds, newRubricId);
    });
};

function duplicateItems(itemIds, newRubricId) {
    if (itemIds.length === 0) {
        return Promise.resolve();
    }
    const itemId = itemIds.shift();
    return db.query(
        'INSERT INTO item (item_name, item_desc, item_wgt, available_pts, rub_id, parent_id) SELECT item_name, item_desc, item_wgt, available_pts, ?, ? FROM item WHERE item_id=?',
        [newRubricId, itemId, itemId]
    )
    .then(() => {
        return db.query(
            'SELECT item_id FROM item WHERE parent_id=?',
            [itemId]
        );
    })
    .then((results) => {
        const childItemIds = results.map((row) => row.item_id);
        return duplicateItems(childItemIds, newRubricId);
    });
}

module.exports.getAllRubrics = function getAllRubrics() {
  return db.query('SELECT * FROM rubric');
};

module.exports.getAllRubricsByCourse = function getAllRubricsByCourse(
  courseId,
) {
  return db
    .query('SELECT * FROM rubric WHERE crs_id=?', [courseId])
    .then((results) => {
      return results.map((rubric) => new Rubric(rubric));
    });
};

module.exports.getAllRubricsBySection = function getAllRubricsBySection(
  sectionId,
) {
  return db
    .query('SELECT * FROM rubric WHERE sec_id=?', [sectionId])
    .then((results) => {
      return results.map((rubric) => new Rubric(rubric));
    });
};

module.exports.getRubricById = function getRubricById(rubricId) {
  return db
    .query('SELECT * FROM rubric WHERE rub_id=?', [rubricId])
    .then((results) => {
      return new Rubric(results[0]);
    });
};

module.exports.getRubricByName = function getRubricByName(rubricName) {
  return db.query('SELECT * FROM rubric WHERE rub_name=?', [rubricName]);
};

module.exports.deleteAllRubricsT = function deleteAllRubricsT() {
  return db.query('DELETE FROM rubric');
};

module.exports.deleteAllRubrics = function deleteAllRubrics() {
  db.query('SELECT rub_id FROM rubric')
    .then((results) => {
      const rubricIds = results.map((row) => row.rub_id);
      const deleteRubrics = rubricIds.map((rubricId) => deleteRubric(rubricId));
      return Promise.all(deleteRubrics);
    })
    .then(() => {
      //console.log('All rubrics deleted');
    })
    .catch((error) => {
      throw Error('Error deleting rubrics:');
    });
};

module.exports.editRubric = function editRubric(rubId, name) {
  return db.query('UPDATE rubric SET rub_name=? WHERE rub_id=?', [name, rubId]);
}
