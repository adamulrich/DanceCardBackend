const router = require('express').Router();
const ctrSchedule = require('../controllers/dance');

//Get Schedule
router.get('/schedule/:regionId',  
    // #swagger.summary = 'This is where you will find the dance schedules. '
    // #swagger.description = 'Dances, where, when, and theme'
    /* #swagger.responses[] = {
        description: 'Dance schedule',
        schema: [{ $ref: '#/definitions/dance'}]
    }
    */
ctrSchedule.getAllDances);

// Get Future Schedule 
router.get('/futureSchedule/:regionId', 
    // #swagger.summary = 'Looking forward to a dance, look here.'
    // #swagger.description = 'Future dances'
    /* #swagger.responses[] = {
        description: 'Future Dance schedule',
        schema: [{ $ref: '#/definitions/dance'}]
    }
    */
ctrSchedule.getAllFutureDances);


// CREATE New Dance Schedule
router.post('/schedule', 
    // #swagger.summary = 'Add a dance'
    // #swagger.description = 'When, Where, Theme'
    /* #swagger.responses[201] = {description: 'OK'}}}*/
     /*#swagger.parameters['obj'] = 
     {in:'body',description: 'Add a dance', schema: { $ref:'#/definitions/dance'}} */
ctrSchedule.createDance);


 // Change Dance Schedule
 router.put('/schedule', 
    // #swagger.summary = 'Update changes to dance'
    // #swagger.description = 'Changes to dance are...'
    /* #swagger.responses[204] = {description: 'OK'}}}*/
    /*#swagger.parameters['obj'] = 
    {in:'body',description: 'Change a dance', schema: { $ref:'#/definitions/dance'}} */
 ctrSchedule.updateDance);

// Delete Dance
router.delete('/schedule/:id', 
    // #swagger.summary = 'Deletes a dance schedule based on ID.'
    // #swagger.description = 'Deletes a dance schedule from the db based on ID.'
    // #swagger.parameters['id'] = { description: 'Schedule' } 
    /* #swagger.responses[200] = {description: 'OK',}    }    */
ctrSchedule.deleteDance);

module.exports = router;