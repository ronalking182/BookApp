const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


const errorModel = require('./models/errorModel')
const booksRoute = require('./routes/booksRoute')


const app = express();

app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Origin, Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    next();
})




app.use('/api/book', booksRoute )




app.use((req, res, next) => {
    const errorMessage = new errorModel('unknown error occurred', 404)
     throw next(errorMessage)
})

app.use((error, req, res, next) => {
    if(res.sentHeader){
        next(error)
    }
   res.status(error.code || 500)
   res.json({message:error.message || 'an error occurred'})
})

mongoose.connect('mongodb+srv://bookApp:fgAsZ7xfpUYFJ2ix@bookcluter.ebfed.mongodb.net/?retryWrites=true&w=majority').
 then(() =>  app.listen(process.env.PORT || 6000,  ()=>{
    console.log('server working and connected to dataBase')
})).catch( err => {
    console.log(err)
})









