const Router = require('express');
const router = new Router();
const controller = require('./postController');

router.get('/', controller.getPosts);
router.post('/createPost', controller.createPost);

module.exports = router 