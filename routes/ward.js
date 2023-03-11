const express = require("express");

const ctrWard = require("../controllers/ward.controller");

const router = express.Router();




router.post("/ward", ctrWard.add_one);

router.get("/ward", ctrWard.getall);

router.get("/ward/:id", ctrWard.getSingle);

router.delete("/ward/:id", ctrWard.delete_one);

router.put("/ward/:id", ctrWard.update_one);

module.exports = router;
