const errorModel = require('../models/errorModel')
const Book = require('../models/booksModel')
const {validationResult} = require('express-validator')


const findBook = async (id) =>{
    let item
    try{
        item = await Book.findById(id)
    }catch(err){
        const errorMsg = new errorModel('something went wrong, pls try again', 500)
        throw errorMsg
    }
    if(!item){
        const errMsg = new errorModel('could not find book, pls try creating it', 404)
        throw errMsg
    }
    return item
}


const checkForError = (incoming) =>{
    const errorMessage = validationResult(incoming)
    if(!errorMessage.isEmpty()) throw new errorModel('pls fill in all the field', 422)
}

module.exports = findBook
module.exports = checkForError