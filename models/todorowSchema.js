const mongoose = require('mongoose')
const {Schema} = mongoose

const todorowSchema = new Schema({
    TodoName: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Todorow', todorowSchema)