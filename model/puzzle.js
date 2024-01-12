const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puzzleSchema = new Schema({
    image: String,
    answer: String,
    category: { type: Schema.Types.ObjectId, ref: 'category' },
});

const puzzle = mongoose.model('puzzle', puzzleSchema);

module.exports = puzzle
