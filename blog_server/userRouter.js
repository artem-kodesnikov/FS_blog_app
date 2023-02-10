const Router = require('express');
const router = new Router();
const controller = require('./userController');

router.put('/updateUsername/:id', controller.updateUserName);
router.put('/updateDisplayname/:id', controller.updateDisplayName);

module.exports = router 