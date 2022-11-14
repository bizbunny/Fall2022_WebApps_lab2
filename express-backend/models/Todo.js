const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true,},
        author: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }
);

//export model
module.exports = mongoose.model('Todo', TodoSchema);