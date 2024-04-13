const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: String,
    option : [String],
    answer : String,
    category : {
        type : Schema.Types.ObjectId,
        ref : 'category'
    }
    
});

const QUESTION = mongoose.model('question', questionSchema);

module.exports = QUESTION