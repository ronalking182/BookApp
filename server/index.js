const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


const errorModel = require('./models/errorModel')


const app = express();

app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Origin, Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
})




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

mongoose.connect('mongodb+srv://Movies:Movies123@movie.h1nyv.mongodb.net/?retryWrites=true&w=majority').then(
    app.listen(process.env.PORT || 8080,  ()=>{
        console.log('server working and connected to dataBase')
    })
).catch( err => {
    console.log(err)
})









