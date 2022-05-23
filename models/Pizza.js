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
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            // reference to Comment model
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        // allow schema to use virtuals
        virtuals: true
    },
    id: false
});

// get total count of comments and replies on retrieval
// virtuals add properties to a document that aren't stored in the database
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export Pizza model
module.exports = Pizza;