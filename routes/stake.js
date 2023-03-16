const express = require("express");

const ctrStake = require("../controllers/stake.controller");

const router = express.Router();




router.post("/stake", (req, res) =>  {
// #swagger.summary = 'Add a stake'
    // #swagger.description = ''
    /* #swagger.responses[201] = {description: 'OK'}}}*/
     /*#swagger.parameters['obj'] = 
     {in:'body',description: 'Add a stake', schema: { $ref:'#/definitions/stake'}} */
    ctrStake.add_one(req, res)})

router.get("/stake", (req, res) =>  {
 // #swagger.summary = 'This is where you will find Stake information. '
    // #swagger.description = ''
    /* #swagger.responses[200] = {
        description: '',
        schema: [{ $ref: '#/definitions/stake'}]
    }
    */
    ctrStake.getall(req, res)})

    router.get("/stakes/region/:id",(req, res) =>  {
    // #swagger.summary = 'This is where you will find Stake information. '
       // #swagger.description = ''
       /* #swagger.responses[200] = {
           description: '',
           schema: [{ $ref: '#/definitions/stake'}]
       }
       */
       ctrStake.getallbyregion(req, res)})

router.get("/stake/:id", (req, res) =>  {
// #swagger.summary = 'This is where you will find Stake information. '
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'Stake id' }
/* #swagger.responses[200] = {
    description: '',
    schema: { $ref: '#/definitions/stake'}
}
*/
ctrStake.getSingle(req, res)})

router.delete("/stake/:id", (req, res) =>  {
// #swagger.summary = 'This is where you will find Stake information. '
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'Stake id' }
/* #swagger.responses[200] = {
    description: '',
}
*/
ctrStake.delete_one(req, res)})

router.put("/stake/:id",(req, res) =>  {
// #swagger.summary = 'Modify a stake'
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'Stake id' }
/* #swagger.responses[204] = {description: 'OK'}}}*/
 /*#swagger.parameters['obj'] = 
 {in:'body',description: 'Modify a stake', schema: { $ref:'#/definitions/stake'}} */
 ctrStake.update_one(req, res)})

module.exports = router;
