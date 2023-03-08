const router = require('express').Router();
const User = require('../controllers/user');

router.get('/user/:email', async (req, res) => {
    console.log('here');
    if (true) {
        // #swagger.summary = 'returns all the hero names and their ids'
        // #swagger.description = 'returns all the hero names and their ids'
        /* #swagger.responses[200] = {
            description: 'user',
            schema: [{ $ref: '#/definitions/User' }]
             }
        }
        */
       User.getUser(req, res);
        
    } else {
        res.status(401).send("Not authenticated.");
    }
}
)

// test route for testing function implementations.
router.get('/test', async (req, res) => {
    console.log('here');
    // #swagger.ignore = true
    const id = await require('../models/stake').getNewStakeId();
    res.status(200).send(`${id}`)
})


module.exports = router;