// load .env file contents into proccess.env by defaults

require ('dotenv').config()  // config for global access
const express =require('express')
const cors = require('cors')  // cors for data dransfer
const router =require('./Route/router')
require ('./DBconnection/connection')
// creates an application express

const pfServer =express()



// use tage using for like export and import connection


pfServer.use(cors()) // cors for data tranfer 

pfServer.use(express.json())

pfServer.use(router)
pfServer.use('/uploads', express.static('./uploads'))


const PORT =4000 ||process.env.PORT 

pfServer.listen(PORT , ()=>{
    console.log(`Project fair started a port ${PORT}..and waiting for thr client request`);
})

pfServer.get( '/',  (req,res)=>{
    res.send('<h1>Project-Fair server running on port waiting for clinent request </h1>')
})

// pfServer.post('/',(req,res)=>{
//   res.send('post request')
// })

// pfServer.put('/',(req,res)=>{
//     res.send('put request')
//   })