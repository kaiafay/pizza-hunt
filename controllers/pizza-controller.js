const { Pizza } = require('../models');

// create functions as methods of the pizzaController object
const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
          .populate({
              path: 'comments',
            //   tells mongoose not to return the __v field on comments
              select: '-__v'
          })
          .select('-__v')
        //   sort pizzas in descending order by the _id value
          .sort({ _id: -1 })
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => {
              res.status(400).json(err);
          });
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
          .populate({
              path: 'comments',
              select: '-__v'
          })
          .select('-__v')
          .then(dbPizzaData => {
            //   if no pizza is found, send error
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this ID!' });
                return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => {
              res.status(400).json(err);
          });
    },

    // create a pizza
    createPizza({ body }, res) {
        Pizza.create(body)
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    updatePizza({ params, body }, res) {
        // mongoose finds a single document and updates it
        // { new: true } tells mongoose to return the new/updated version of the document
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbPizzaData => {
              if(!dbPizzaData) {
                  res.status(404).json({ message: 'No pizza found with this ID!' });
                  return;
              }
              res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
          .then(dbPizzaData => {
              if(!dbPizzaData) {
                  res.status(404).json({ message: 'No pizza found with this ID!' });
                  return;
              }
              res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;