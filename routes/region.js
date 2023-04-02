const router = require('express').Router();
const region = require('../controllers/region');

router.get('/region', async (req, res) => {
        // #swagger.summary = 'returns a region'
        // #swagger.description = ''
        /* #swagger.responses[200] = {
            description: 'region',
            schema: [{ $ref: '#/definitions/region' }]
             }
        }
        */
       region.getRegions(req, res);  
})

router.get('/region/:regionId', async (req, res) => {
        // #swagger.summary = 'returns a region'
        // #swagger.description = ''
        /* #swagger.responses[200] = {
            description: 'region',
            schema: { $ref: '#/definitions/region' }
             }
        }
        */
       region.getRegion(req, res);  
})

router.get('/region/:regionId/wards', async (req, res) => {
    // #swagger.summary = 'returns a list of wards for a region'
    // #swagger.description = ''
    /* #swagger.responses[200] = {
        description: 'region',
        schema: { $ref: '#/definitions/region' }
         }
    }
    */
   region.getAllWardsInRegion(req, res);  
})

router.get('/region/:regionId/stakes', async (req, res) => {
    // #swagger.summary = 'returns a list of stakes in a region'
    // #swagger.description = ''
    /* #swagger.responses[200] = {
        description: 'region',
        schema: { $ref: '#/definitions/region' }
         }
    }
    */
   region.getAllStakesInRegion(req, res);  
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

router.put('/region/:regionId', async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV) {
        // #swagger.summary = 'Update a user by admin region ID'
        // #swagger.description = 'Update a user by admin region ID'
        /* #swagger.responses[204] = {
                description: 'OK',
                }
        }
        */ 
        /*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: 'Update region info',
                    schema: { $ref: '#/definitions/region' }
            } */
       region.updateRegion(req, res);  
    } else {
        res.status(401).send("Not authenticated.");
    }
})

router.delete('/region/:regionId', async (req, res) => {
    if (req.oidc.isAuthenticated() || process.env.ENV_DEV) {
        // #swagger.summary = 'deletes a region by region ID'
        // #swagger.description = ''
        /* #swagger.responses[200] = {
            description: 'region',
            schema: [{ $ref: '#/definitions/region' }]
             }
        }
        */
       region.deleteRegion(req, res);  
    } else {
        res.status(401).send("Not authenticated.");
    }
})


module.exports = router;
