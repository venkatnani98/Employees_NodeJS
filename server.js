// const express = require('express')
// const dotEnv = require('dotenv')

// //Requiring MongoDB

// const {MongoClient} = require('mongodb')

// //Configuration

// dotEnv.config()

// MongoClient.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("MondoGB is Connected")
// }).catch((error)=>{
//     console.log(error)
// })

// const app = express()

// const PORT = 5000

// app.listen(PORT, ()=>{
//     console.log(`Server Started at Server localhost:${PORT}`)
// })

//Connecting MONDO DB to App  ( BASIC LEVEL )
// We can use Mongoose to access MongoDB database---we will do that later



// REST API
//Installing Additional Packages
// mongoose- use to interact database
// body-parser - used to parse HTML received from frontend


const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
const ejs = require('ejs')

const employeeRoutes = require('./Routes/employeeRoutes')

const app = express()

const PORT = process.env.PORT || 5000



dotEnv.config()

app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is Connected Successfully")
}).catch((error)=>{console.log(error)})


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/employees', employeeRoutes)

// To render Server side- we use ejs. We can create templates and render here

//Register ejs
app.set('view engine', 'ejs')

//To connect public files like css etc, we need to do this as below
app.use('/public', express.static('public'));


app.get('/addemployee', (req, res)=>{
    res.render('addEmployee')
})
app.get('/employees/get', (req, res)=>{
    res.render('list')
})
app.get('/edit', (req, res)=>{
    res.render('editEmployee')
})




app.listen(PORT, ()=>{
    console.log(`Server Started at Server localhost:${PORT}`)
})
