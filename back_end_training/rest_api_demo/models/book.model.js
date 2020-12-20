const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        authors: [
            {
                type: Schema.Types.ObjectId, ref: 'Author' 
            }
        ],
        publish_date: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

BookSchema.index({title: 1, authors: 1}, {unique: true});

module.exports = {
    BookModel: new model("books", BookSchema),
};