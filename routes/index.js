const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send("Heartbeat.")
})

module.exports = router;
