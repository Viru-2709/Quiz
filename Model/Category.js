const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cateSchema = new Schema({
    categoryname: String,
    image : String
});

const CATEGORY = mongoose.model('category', cateSchema);

module.exports = CATEGORY