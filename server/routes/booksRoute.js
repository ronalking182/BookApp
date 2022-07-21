const booksController = require('../controller/booksController')
const {check} = require('express-validator')
const express = require('express')
const fileUpload = require('../middleware/fileUpload')

const Routes = express.Router()

Routes.post(
    '/create', 
    fileUpload.single('image')
    ,
    [
     check('title').not().isEmpty(),
     check('author').not().isEmpty(),
     check('description').not().isEmpty(),
    ], 
    booksController.createBook
)

Routes.get(
    '/allBooks',
    booksController.displayBook
)

Routes.get(
    '/:id',
    booksController.specificBook
)

Routes.put(
    '/:id',
    [
     check('title').not().isEmpty(),
        check('author').not().isEmpty(),
        check('description').not().isEmpty(),
       ],
    booksController.updateBook
)

Routes.delete(
    '/:id',
    booksController.deleteBook
)

module.exports = Routes