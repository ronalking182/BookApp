const mongoose = require('mongoose')


const Schema = mongoose.Schema

const BookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
   author:{
        type:String,
        required:true
    },
    pagesNumber:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Book', BookSchema)