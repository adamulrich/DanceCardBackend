const router = require('express').Router();
const user = require('../controllers/user');
const { requiresAuth } = require('express-openid-connect');
const { jwtCheck } = require('../controllers/utils');



router.get('/user/:email', async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV) {
        // #swagger.summary = 'returns a users data'
        // #swagger.description = ''
        /* #swagger.responses[200] = {
            description: 'user',
            schema: { $ref: '#/definitions/user' }
             }
        }
        */
       user.getUser(req, res);
        
    } else {
        res.status(401).send("Not authenticated.");
    }
}
)

router.post('/user', jwtCheck, async (req, res) => {
    console.log(req.headers);
    console.log(req.oidc);
    req.oidc.accessToken = reg.headers.authorization
    const authStatus = await req.oidc.isAuthenticated();
    if (authStatus || process.env.ENV_DEV) {
        // #swagger.summary = 'add a user to the db'
        // #swagger.description = 'add a user to the db'
        /* #swagger.responses[201] = {
                description: 'OK'}
                }
        }
        */
        /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add a user',
                schema: { $ref: '#/definitions/user' }
            } */
            
            user.createUser(req, res);
    } else {
        res.status(401).send("Not authenticated.");
    }
});


router.put("/user/:email", async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV)
    {
    // #swagger.summary = 'replaces a user in the db based on ID'
    // #swagger.description = 'replaces a user in the db based on ID'
    /* #swagger.responses[204] = {
            description: 'OK',
             }
    }
    */ 
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Replace user info',
                schema: { $ref: '#/definitions/user' }
        } */

        user.updateUser(req, res);
    } else {
        res.status(401).send("Not authenticated.");
    }
});

router.delete("/user/:email", requiresAuth(), async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV) {
    // #swagger.summary = 'deletes a user from the db based on email.'
    /* #swagger.responses[200] = {
            description: 'OK',
             }
    }
    */
        user.deleteUser(req, res);
    } else {
        res.status(401).send("Not authenticated.");
    }
});



// test route for testing function implementations.
router.get('/test', async (req, res) => {

    // #swagger.ignore = true
    const id = await require('../models/stake').getNewStakeId();
    res.status(200).send(`${id}`)
})


module.exports = router;
