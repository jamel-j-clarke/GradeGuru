const express = require( 'express' );
const rubricCategoryRouter = express.Router();
const rubricCategoryDAO = require( '../../model/dao/RubricCategoryDAO' );

rubricCategoryDAO.use( express.json() );

const TokenMiddleware = require( '../../middleware/TokenMiddleware.js' );
const AuthorizationMiddleware = require( '../../middleware/AuthorizationMiddleware.js' );
const ShibbolethMiddleware = require( '../../middleware/ShibbolethMiddleware.js' );

rubricCategoryRouter.post( '/rubricCategories', ( req, res ) => {
    // TODO
});

rubricCategoryRouter.get( '/rubricCategories/:categoryId', ( req, res ) => {
    // TODO
});

rubricCategoryRouter.put( '/rubricCategories/:categoryId', ( req, res ) => {
    // TODO
});

rubricCategoryRouter.delete( '/rubricCategories/:categoryId', ( req, res ) => {
    // TODO
});

// add rubric item to rubric category
rubricCategoryRouter.post( '/rubricCategories/:categoryId/:itemId', ( req, res ) => {
    // TODO
});

// remove rubric item from rubric category
rubricCategoryRouter.delete( '/rubricCategories/:categoryId/:itemId', ( req, res ) => {
    // TODO
});