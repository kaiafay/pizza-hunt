const router = require('express').Router();
const { 
    addComment, 
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// post comment route at /api/comments/:pizzaId
router.route('/:pizzaId').post(addComment);

// PUT reply and DELETE comment at /api/comments/:pizzaId/:commentId
router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment);

// DELETE reply at /api/:pizzaId/:commentId/:replyId
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;