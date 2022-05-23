const { Comment, Pizza } = require('../models');

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        Comment.create(body)
          .then(({ _id }) => {
              return Pizza.findOneAndUpdate(
                  { _id: params.pizzaId },
                //   add the comment's id to the specific pizza that's being updated
                  { $push: { comments: _id }},
                  { new: true }
              );
          })
          .then(dbPizzaData => {
              if(!dbPizzaData) {
                  res.status(404).json({ message: 'No pizza found with this ID!' });
                  return;
              }
              res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
    },

    // remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deleteComment => {
              if(!deleteComment) {
                  res.status(404).json({ message: 'No comment with this ID!' });
                  return;
              }
              return Pizza.findOneAndUpdate(
                  { _id: params.pizzaId },
                //   the mongo $pull method removes the comment from its associated pizza
                  { $pull: { comments: params.commentId }},
                  { new: true }
              );
          })
          .then(dbPizzaData => {
              if(!dbPizzaData) {
                  res.status(404).json({ message: 'No pizza found with this ID!' });
                  return;
              }
              res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
    }
};

module.exports = commentController;