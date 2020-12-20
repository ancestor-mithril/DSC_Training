const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        date_of_birth: {
            type: Number,
            required: true,
        },
        date_of_death: {
            type: Number,
            required: false,
        },
        nationality: {
            type: String,
            required: true,
        },
        books: [
            {
                type: Schema.Types.ObjectId, ref: 'Book' 
            }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = {
    AuthorModel: new model("authors", AuthorSchema),
};