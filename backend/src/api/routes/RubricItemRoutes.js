const express = require( 'express' );
const rubricItemRouter = express.Router();
const rubricItemDAO = require( '../../model/dao/RubricItemDAO' );

rubricItemRouter.use( express.json() );

const TokenMiddleware = require( '../../middleware/TokenMiddleware.js' );
const AuthorizationMiddleware = require( '../../middleware/AuthorizationMiddleware.js' );
const ShibbolethMiddleware = require( '../../middleware/ShibbolethMiddleware.js' );

//Creates new rubric item
rubricItemRouter.post( '/', ( req, res ) => {

    let itemId;
    let rubricId = req.body.rubricId;
    let itemName = req.body.itemName;
    let weight = req.body.weight;
    let points = req.body.points;
    let description = req.body.description;
    let parentId = req.body.parentId;

    rubricItemDAO
        .createRubricItem(itemName, description, weight, points, rubricId, parentId)
        .then(({ insertId }) => {
            res.json({ success: 'success', itemId: insertId.toString() });
        })
        .catch((error) => {
            console.log(error);
            res.status(403).json(findErrorMessage(error));
        });
});

rubricItemRouter.get( '/rubric/:rubricId', ( req, res ) => {
    rubricItemDAO.getRubricItemsByRubric(req.params.rubricId).then(rubricItems => {
        res.json(rubricItems);
    }).catch(error => {
        console.log(error);
        res.status(404).json("Not found: Error " + findErrorMessage(error));
    });
});

//Gets rubric item by ID
rubricItemRouter.get( '/:itemId', ( req, res ) => {
    
    rubricItemDAO.getRubricItemById(req.params.itemId).then(rubricItem => {
        res.json(rubricItem);
    }).catch(error => {
        console.log(error);
        res.status(404).json("Not found: Error " + findErrorMessage(error));
    });

});

//Updates rubric item by ID
rubricItemRouter.put( '/:itemId', ( req, res ) => {
    
    let itemId = req.params.id;
    let itemName = req.body.itemName;
    let weight = req.body.weight;
    let points = req.body.points;
    let description = req.body.description;

    rubricItemDAO.editRubricItem( itemName, description, weight, points, itemId ).then(result => {
        res.json({result: result});
    }).catch(error => {
        console.log(error);
        res.status(404).json(findErrorMessage(error));
    })

});

// Deletes a rubric item by ID
rubricItemRouter.delete( '/:itemId', ( req, res ) => {
    
    rubricItemDAO.deleteRubricItem(req.params.itemId).then(() => {
        res.json({success: "success"});
    }).catch(error => {
        res.status(404).json("Not found: Error " + findErrorMessage(error));
    });

});

module.exports = rubricItemRouter;

//Helper function to return error message if it exists
function findErrorMessage(error) {
    if(error.message) {
        return error.message;
    }
    return error;
}