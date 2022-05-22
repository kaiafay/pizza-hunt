const { Schema, model } = require('mongoose');

// create pizza schema
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

// create Pizza model using PizzaSchema
const pizza = model('Pizza', PizzaSchema);

// export Pizza model
module.exports = Pizza;