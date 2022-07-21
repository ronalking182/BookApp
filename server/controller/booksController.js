const errorModel = require('../models/errorModel')
const {validationResult} = require('express-validator')
const Book = require('../models/booksModel')




const createBook = async (req, res) => {
  const {title, author, description, pagesNumber, image} = req.body
   const errorMessage = validationResult(req)
   if(!errorMessage.isEmpty()){
    const errMsg = new errorModel('pls fill in all the field', 422)
    throw errMsg
   }
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
    let bookToFind
    try{
        bookToFind = await Book.findById(bookId)
    }catch(err){
        const errorMsg = new errorModel('something went wrong, pls try again', 500)
        throw errorMsg
    }

    // if(!bookToFind){
    //     const errMsg = new errorModel('could not find book, pls try creating it', 404)
    //     throw errMsg
    // }

    res.status(200).json({book:bookToFind.toObject({getters:true})})
}



const updateBook = async (req, res) =>{
    const bookID = req.params.id
    const {title, author, description, pagesNumber, image} = req.body
    const errorMessage = validationResult(req)
   if(!errorMessage.isEmpty()){
    const errMsg = new errorModel('please fill in the required field', 422)
    throw errMsg
   }
   let bookToUpdate

   try{
     bookToUpdate = await Book.findById(bookID)
   }catch(e){
    const errMsg = new errorModel('something went wrong', 500)
    throw errMsg
   }

   if(!bookToUpdate){
    const errMsg = new errorModel('could not find book', 404)
    throw errMsg
   }

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

  let bookToDelete
     try{
        bookToDelete = await Book.findById(bookId)
      }catch(e){
       const errMsg = new errorModel('something went wrong', 500)
       throw errMsg
      }

     

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
