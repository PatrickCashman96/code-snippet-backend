const { Schema, model} = require("mongoose");

const favoriteSchema = new Schema (
    {
        user : {type: Schema.Types.ObjectId, ref: "User", required: true},
        snippet: {type: Schema.Types.ObjectId, ref: "Snippet", required: true},
    },
    {timestamps: true}
);

favoriteSchema.index({user: 1, snippet:1}, {unique: true});

const Favorite = model("Favorite", favoriteSchema);
module.exports = Favorite;