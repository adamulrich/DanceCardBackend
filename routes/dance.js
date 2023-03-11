const router = require('express').Router();
const Schedule = require('../controllers/dance');

//Get Schedule
router.get('/schedule/:{regionId}', async (req, res) => {
    if( req.oidc.isAuthenticated() || process.env.ENV_DEV) {
        // #swagger.summary = 'This is where you will find the dance schedules. '
        // #swagger.description = 'Dances, where, when, and theme'
        /* #swagger.responses[] = {
            description: 'Dance schedule',
            schema: [{ $ref: '#/description/schedule'}]
        }
        */
        Schedule.getDanceSchedule;
    } else {
        res.status(401).send("Not Authenticated.");
    }
});

// Get Future Schedule 
routes.get('/futureSchedule/:{regionId}', 
        // #swagger.summary = 'Looking forward to a dance, look here.'
        // #swagger.description = 'Future dances'
        /* #swagger.responses[] = {
            description: 'Future Dance schedule',
            schema: [{ $ref: '#/description/futureSchedule'}]
        }
        */
Schedule.getFutureDanceSchedule);

// GET A DANCE 
routes.get('/schedule/:{stakeHost}',
        // #swagger.summary = 'Get a dance'
        // #swagger.description = 'One dance schedule'
        /* #swagger.responses[] = {
            description: 'A Dance',
            schema: [{ $ref: '#/description/schedule'}]
        }
        */
Schedule.getaDance);

// CREATE New Dance Schedule
routes.post('/schedule', 
// #swagger.summary = 'Add a dance'
// #swagger.description = 'When, Where, Theme'
/* #swagger.responses[201] = {description: 'OK'}}}*/
 /*#swagger.parameters['obj'] = 
 {in:'body',description: 'Add a dance', schema: { $ref:'#/definitions/schedule'}} */
Schedule.createDance);


 // Change Dance Schedule
 routes.put('/schedule', 
 // #swagger.summary = 'Update changes to dance'
// #swagger.description = 'Changes to dance are...'
/* #swagger.responses[204] = {description: 'OK'}}}*/
 /*#swagger.parameters['obj'] = 
 {in:'body',description: 'Change a dance', schema: { $ref:'#/definitions/schedule'}} */
 Schedule.updateDance);

// Delete Dance
routes.delete('/schedule/:{regionId}', 
// DELETE
 // #swagger.summary = 'Deletes a dance schedule based on ID.'
// #swagger.description = 'Deletes a dance schedule from the db based on ID.'
// #swagger.parameters['id'] = { description: 'Schedule' } 
/* #swagger.responses[200] = {description: 'OK',}    }    */
Schedule.deleteDance);

module.exports = router;