const db = require('../db/DBConnection');
const Rubric = require('../models/Rubric');
const RubricCategory = require('../models/RubricCategory');
const RubricItem = require('../models/RubricItem');

// potentially have rubricId be a parameter?
module.exports.createRubricItem = function createRubricItem(
  name,
  description,
  weight,
  points,
  rubricId,
  parentId,
) {
  var id;
  return db.query(
    'INSERT INTO item (item_name, item_desc, item_wgt, available_pts, rub_id, parent_id) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, weight, points, rubricId, parentId],
    (error, results, fields) => {
      return results.item_id;
    },
  );
}

module.exports.getRubricItemById = function getRubricItemById(itemId) {
  return db.query('SELECT * FROM item WHERE item_id=?', [itemId]);
}

module.exports.editRubricItem = function editRubricItem(itemId, name, description, weight, points) {
  return db.query(
    'UPDATE item SET item_name=?, item_desc=?, item_wgt=?, available_pts=? WHERE item_id=?',
    [name, description, weight, points, itemId],
  );
}

module.exports.deleteRubricItem = function deleteRubricItem(itemId) {
  return db.query(
    'SELECT * FROM item WHERE parent_id=?',
    [itemId],
    (error, results, fields) => {
      if (results.length > 0) {
        const childIds = results.map((item) => item.item_id);
        childIds.forEach((childId) => deleteRubricItem(childId));
      }
    }
  ).then(() => {
    return db.query('DELETE FROM item WHERE item_id=?', [itemId]);
  });
}

module.exports.getRubricItemsByRubric = function getRubricItemsByRubric(rubricId) {
  return db.query('SELECT * FROM item WHERE rub_id=?', [rubricId]);
}

module.exports.getRubricItemsByParent = function getRubricItemsByParent(parentId) {
  return db.query('SELECT * FROM item WHERE parent_id=?', [parentId]);
}

module.exports.updateItemWeight = function updateItemWeight(itemId, weight) {
  return db.query('UPDATE item SET item_wgt=? WHERE item_id=?', [
    weight,
    itemId,
  ]);
}

module.exports.updateItemParent = function updateItemParent(itemId, parentId) {
  return db.query('UPDATE item SET parent_id=? WHERE item_id=?', [
    parentId,
    itemId,
  ]);
}

module.exports.deleteAllItemsT = function deleteAllItemsT() {
  return db.query('DELETE FROM item');
};

module.exports.getAllItems = function getAllItems() {
  return db.query('SELECT * FROM item').then((items) => {
    return items;
  });
};
