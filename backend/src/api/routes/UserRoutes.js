const express = require( 'express' );
const userRouter = express.Router();
const userDAO = require( '../../model/dao/UserDAO' );

userRouter.use( express.json() );

const TokenMiddleware = require( '../../middleware/TokenMiddleware.js' );
const AuthorizationMiddleware = require( '../../middleware/AuthorizationMiddleware.js' );
const ShibbolethMiddleware = require( '../../middleware/ShibbolethMiddleware.js' );

userRouter.get( '/user/:userId', ( req, res ) => {
    // TODO
});

userRouter.post( '/user/:userId', ( req, res ) => {
    // TODO
});

userRouter.delete( '/user/:userId', ( req, res ) => {
    // TODO
});

userRouter.get( '/user/current', ( req, res ) => {
    // TODO
});

userRouter.get( '/:userId/sections', ( req, res ) => {
    // TODO
});

userRouter.post( '/:userId/:sectionId', ( req, res ) => {
    // TODO
});

userRouter.delete( '/:userId/:sectionId', ( req, res ) => {
    // TODO
});