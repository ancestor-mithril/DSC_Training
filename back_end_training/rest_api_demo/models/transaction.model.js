const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId, ref: 'User',
            required: true,
        },
        book: {
            type: Schema.Types.ObjectId, ref: 'Book',
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        no_of_items: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = {
    TransactionModel: new model("transactions", TransactionSchema),
};