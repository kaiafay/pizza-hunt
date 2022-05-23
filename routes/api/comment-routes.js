const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// post comment route at /api/comments/:pizzaId
router.route('/:pizzaId').post(addComment);

// delete comment route at /api/comments/:pizzaId/:commentId
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;