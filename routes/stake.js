const express = require("express");

const ctrStake = require("../controllers/stake.controller");

const router = express.Router();




router.post("/stake", ctrStake.add_one);

router.get("/stake", ctrStake.getall);

router.get("/stake/:id", ctrStake.getSingle);

router.delete("/stake/:id", ctrStake.delete_one);

router.put("/stake/:id", ctrStake.update_one);

module.exports = router;
