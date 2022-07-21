const booksController = require('../controller/booksController')
const {check} = require('express-validator')
const express = require('express')


const Routes = express.Router()

Routes.post(
    '/create', 
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