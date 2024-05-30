const db = require( '../db/DBConnection' );
const Rubric = require( '../models/Rubric' );
const RubricCategory = require( '../models/RubricCategory' );
const RubricItem = require( '../models/RubricItem' );

// potentially have rubricId be a parameter?
function createRubricCategory( name, weight ) {
    // TODO
}

function getRubricCategory( rubricId, categoryId ) {
    // TODO
}

function editRubricCategory( name, weight, categoryId ) {
    // TODO
}

function deleteRubricCategory( categoryId ) {
    // TODO
}