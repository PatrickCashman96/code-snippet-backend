const { Schema, model } = require("mongoose");

const snippetSchema = new Schema(
{
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    code: {
        type:String,
        required:[true, "Code is required"],
    },
    language: {
        type: String,
        required:[true, "Language is required"],
        enum: ["JavaScript", "TypeScript", "Python", "Java", "Rust", "C++", "C#", "C", "Go", "PHP"],
    },
    tags: {
        type: [String],
        default: [],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
},
{timestamps:true}
);

const Snippet = model("Snippet", snippetSchema);
module.exports = Snippet;