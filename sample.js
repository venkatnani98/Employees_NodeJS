// Creating server using Express JS
const express = require('express');

const app = express();

const port = 5000;

app.listen(port, ()=>{
    console.log("Server Started and Running Successfully");
})


//Adding Middlware

// app.use((req,res,next) => {

//     if (10 == 20){
//        next()
//     }
// })

// We can create Middleware and assign to a variable

const firstHandler = ((req,res,next) => {

    if (10 < 20){
       next()
    }
})

//Adding Routes

app.get('/', (req, res)=>{
   res.send("This is Home Page"); 
})
app.get('/about', (req, res)=>{
   res.send("This is About Page"); 
})

// Adding middleare to the route

app.get('/user/:12', firstHandler, (req, res)=>{
   res.send("You searched for User 12"); 
})