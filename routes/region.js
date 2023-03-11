const router = require('express').Router();
const region = require('../controllers/region');

router.get('/region/:regionId', async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV) {
        // #swagger.summary = 'returns a region'
        // #swagger.description = ''
        /* #swagger.responses[200] = {
            description: 'region',
            schema: { $ref: '#/definitions/region' }
             }
        }
        */
       region.getRegion(req, res);  
    } else {
        res.status(401).send("Not authenticated.");
    }
})

module.exports = router;