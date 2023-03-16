const express = require("express");

const ctrStake = require("../controllers/stake.controller");

const router = express.Router();




router.post("/stake",
// #swagger.summary = 'Add a stake'
    // #swagger.description = ''
    /* #swagger.responses[201] = {description: 'OK'}}}*/
     /*#swagger.parameters['obj'] = 
     {in:'body',description: 'Add a stake', schema: { $ref:'#/definitions/stake'}} */
    ctrStake.add_one());

router.get("/stake",
 // #swagger.summary = 'This is where you will find Stake information. '
    // #swagger.description = ''
    /* #swagger.responses[200] = {
        description: '',
        schema: [{ $ref: '#/definitions/stake'}]
    }
    */
    ctrStake.getall());

    router.get("/stakes/region/:id",
    // #swagger.summary = 'This is where you will find Stake information. '
       // #swagger.description = ''
       /* #swagger.responses[200] = {
           description: '',
           schema: [{ $ref: '#/definitions/stake'}]
       }
       */
       ctrStake.getallbyregion());

router.get("/stake/:id",
// #swagger.summary = 'This is where you will find Stake information. '
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'Stake id' }
/* #swagger.responses[200] = {
    description: '',
    schema: { $ref: '#/definitions/stake'}
}
*/
ctrStake.getSingle());

router.delete("/stake/:id", 
// #swagger.summary = 'This is where you will find Stake information. '
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'Stake id' }
/* #swagger.responses[200] = {
    description: '',
}
*/
ctrStake.delete_one());

router.put("/stake/:id",
// #swagger.summary = 'Modify a stake'
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'Stake id' }
/* #swagger.responses[204] = {description: 'OK'}}}*/
 /*#swagger.parameters['obj'] = 
 {in:'body',description: 'Modify a stake', schema: { $ref:'#/definitions/stake'}} */
 ctrStake.update_one());

module.exports = router;
