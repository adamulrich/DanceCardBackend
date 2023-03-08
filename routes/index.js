const router = require('express').Router();

router.get('/', (req, res) => {
    // #swagger.ignore = true
    if (req.oidc.isAuthenticated()) {
        res.render('profile', {
            title: 'Profile',
            image: req.oidc.user.picture,
            name: req.oidc.user.name,
            user_id: req.oidc.user.sub
        });
      } else 
    {
        res.render('profile', {
            title: 'Profile',
            image: '',
            name: 'Not logged in.',
            user_id: ''
        })
  }
})

// test route for testing function implementations.
// router.get('/test', async (req, res) => {
//     // #swagger.ignore = true
//     const id = await require('../models/stake').getNewStakeId();
//     res.status(200).send(`${id}`)
// })


module.exports = router;
