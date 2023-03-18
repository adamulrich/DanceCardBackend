const express = require("express");

const ctrWard = require("../controllers/ward.controller");

const router = express.Router();




router.post("/ward", (req, res) =>  {
// #swagger.summary = 'Add a stake'
    // #swagger.description = ''
    /* #swagger.responses[201] = {description: 'OK'}}}*/
     /*#swagger.parameters['obj'] = 
     {in:'body',description: 'Add a stake', schema: { $ref:'#/definitions/ward'}} */
    ctrWard.add_one(req, res)})

router.get("/ward", (req, res) =>  {
 // #swagger.summary = 'This is where you will find ward information. '
    // #swagger.description = ''
    /* #swagger.responses[200] = {
        description: '',
        schema: [{ $ref: '#/definitions/ward'}]
    }
    */
    ctrWard.getall(req, res)})

    router.get("/wards/region/:id",(req, res) =>  {
    // #swagger.summary = 'This is where you will find Stake information. '
       // #swagger.description = ''
       /* #swagger.responses[200] = {
           description: '',
           schema: [{ $ref: '#/definitions/ward'}]
       }
       */
       ctrWard.getallbyregion(req, res)})

router.get("/ward/:id", (req, res) =>  {
// #swagger.summary = 'This is where you will find ward information. '
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'ward id' }
/* #swagger.responses[200] = {
    description: '',
    schema: { $ref: '#/definitions/ward'}
}
*/
ctrWard.getSingle(req, res)})

router.delete("/ward/:id", (req, res) =>  {
// #swagger.summary = 'This is where you will find ward information. '
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'ward id' }
/* #swagger.responses[200] = {
    description: '',
}
*/
ctrWard.delete_one(req, res)})

router.put("/ward/:id",(req, res) =>  {
// #swagger.summary = 'Modify a ward'
// #swagger.description = ''
// #swagger.parameters['id'] = { description: 'ward id' }
/* #swagger.responses[204] = {description: 'OK'}}}*/
 /*#swagger.parameters['obj'] = 
 {in:'body',description: 'Modify a ward', schema: { $ref:'#/definitions/ward'}} */
 ctrWard.update_one(req, res)})

module.exports = router;
