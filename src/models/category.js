const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    //type identify karanyasathi page ki list ki store aahe olakhanyasathi
    type: {
        type: String
    },
    //categoryImage not mandatory might be empty
    categoryImage: { type: String },
    parentId: {
        type: String
    }

}, { timestamps: true });
module.exports = mongoose.model('Category', categorySchema)