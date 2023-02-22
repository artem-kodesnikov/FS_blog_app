const Router = require('express');
const router = new Router();
const controller = require('../controllers/postController');

router.get('/', controller.getPosts);
router.get('/data', controller.postPagination);
router.post('/createPost', controller.createPost);
router.delete('/deletePost', controller.deletePost);

module.exports = router;