const router = require('express').Router();
const region = require('../controllers/region');

router.get('/region', async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV) {
        // #swagger.summary = 'returns a region'
        // #swagger.description = ''
        /* #swagger.responses[200] = {
            description: 'region',
            schema: [{ $ref: '#/definitions/region' }]
             }
        }
        */
       region.getRegions(req, res);  
    } else {
        res.status(401).send("Not authenticated.");
    }
})

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

router.post("/region", async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV) {
        // #swagger.summary = 'add a region to the db'
        // #swagger.description = 'add a region to the db'
        /* #swagger.responses[201] = {
                description: 'OK'}
                }
        }
        */
        /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Add a region',
                schema: { $ref: '#/definitions/region' }
            } */

        region.createRegion(req, res);
    } else{
        res.status(401).send("Not authenticated.");
    }
})


module.exports = router;