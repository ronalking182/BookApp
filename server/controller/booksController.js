const errorModel = require('../models/errorModel')
const {validationResult} = require('express-validator')
const Book = require('../models/booksModel')

const findBook  = require('../util/helpers')
const checkForError  = require('../util/helpers')


const createBook = async (req, res) => {
  const {title, author, description, pagesNumber, image} = req.body
  checkForError(req)
  const book = new Book({
    title,
    author,
    pagesNumber,
    description,
    image
  })
  const result  = await book.save()
  res.status(200).json({message:'book created successfully'})
}


const displayBook = async (req, res) =>{
  const allBooks = await Book.find()
  res.status(200).json(allBooks)
}


const specificBook = async (req, res) =>{
    const bookId = req.params.id
    const bookToFind = await findBook(bookId)
    res.status(200).json({book:bookToFind.toObject({getters:true})})
}



const updateBook = async (req, res) =>{
    const {title, author, description, pagesNumber, image} = req.body
    const bookID = req.params.id
    checkForError(req)
    const bookToUpdate =  await findBook(bookID)

  bookToUpdate.title = title
  bookToUpdate.author = author
  bookToUpdate.pagesNumber = pagesNumber
  bookToUpdate.description =description
  bookToUpdate.image =image

  try{
    await bookToUpdate.save()
  }catch(err){
    const errMsg = new errorModel('could not update book please try again', 500)
    throw errMsg
  }

  res.status(200).json({message:"book updated successfully"})
}



const deleteBook = async (req, res, next) =>{
     const bookId = req.params.id
     const bookToDelete = findBook(bookId)
   
      try{
         await bookToDelete.remove()
      }catch(e){
        const errMsg = new errorModel('could not delete book,!! please try again', 500)
        throw errMsg
       }

       res.status(200).json({message:"book deleted successfully"})
}

exports.createBook = createBook
exports.displayBook = displayBook
exports.updateBook = updateBook
exports.deleteBook = deleteBook
exports.specificBook = specificBook
