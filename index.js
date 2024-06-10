// const express = require('express')
// console.log('hello worldnpm outdated')
// const server = express()
// server.listen(8080)

// const http = require('http')
require('dotenv').config()
const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const { Schema } = mongoose;

// const productController = require('./controller/product')
const productRouter= require('./routes/product')
const userRouter= require('./routes/user')
// const { title } = require('process')
const index = fs.readFileSync('index.html','utf-8')
// const data = {age : 5}
const data2 = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
const products = data2.products
// const server = http.createServer((req,res)=>{
    // console.log('server started', req.url)
    // console.log(req.url)
    // res.setHeader('Dummy','DummyValue')
   
    // res.setHeader('Content-Type','application/json')
    // res.end(JSON.stringify(data))

    // res.setHeader('Content-Type', 'text/html')
    // res.end(index)

    // res.setHeader('Content-Type', 'application/json')
    // res.end(data2)
//     if(req.url.startsWith('/product')){
//         const id = req.url.split('/')[2]
//         const product = products.find(p=>p.id===(+id))
//         res.setHeader('Content-Type', 'text/html')
//         const modifiedIndex = index.replace('**title**', product.title).replace('**url**', product.thumbnail).replace('**price**', product.price).replace('**rating**', product.rating)
//   res.end(modifiedIndex)
//   return
//     }
//     switch(req.url){
//         case '/':
//            res.setHeader('Content-Type', 'text/html')
//     res.end(index)
//     break
//     case '/api':
//           res.setHeader('Content-Type', 'application/json')
//     res.end(JSON.stringify(data2))
//     break
   
       

//     default:
//         res.writeHead(404)
//         res.end()
//     }
// })

// server.listen(8080)

// server is a sort of func which runs each time a req is made


// API - ENDPOINT-ROUTE


const server = express()

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server.use(cors())
// server.use(morgan('dev'))
server.use(morgan('default'))

// server.use((req,res,next)=>{
//     console.log(req.method, req.ip, req.hostname,new Date(), req.get('User-Agent'))
//     next()
// })
server.use(express.json())

// const auth = (req, res, next)=>{
//     console.log(req.query)
//     if(req.query.password == '123'){
//         next()
//     }
//     else{
//         res.sendStatus(401)
//     }
// }

// server.use(auth)
const auth = (req, res, next)=>{
  
    // if(req.body.password == '123'){
    //     next()
    // }
    // else{
    //     res.sendStatus(401)
    // }
    next()
}
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)))
server.use('/products',productRouter.router)
server.use('/users',userRouter.router)
server.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'))
})

// CREATE POST/ products
// productRouter.post('/products',productController.createProduct)
// READ GET/ products
// productRouter.get('/products',productController.getAllProducts)
// productRouter.get('/products/:id',auth,productController.getProduct)

//  UPDATE PUT /products/:id
// productRouter.put('/products/:id',auth,productController.updateProduct)

//  UPDATE PATCH /products/:id
// productRouter.patch('/products/:id',auth,productController.updatePatchProduct)

//  UPDATE DELETE /products/:id
// productRouter.delete('/products/:id',auth,productController.deleteProduct)


// The res of GET1 & not GET2 will be send since in a server whatever respose is once send for a particular request the server doesnot go ahead
// server.get('/',(req,res)=>{
//     res.json({type:'GET2'})
// })

// server.post('/',auth,(req,res)=>{
//     res.json({type:'POST'})
// })

// server.put('/',(req,res)=>{
//     res.json({type:'PUT'})
// })

// server.delete('/',(req,res)=>{
//     res.json({type:'DELETE'})
// })
// server.patch('/',(req,res)=>{
//     res.json({type:'PATCH'})
// })

// server.get('/',(req, res)=>{
    // res.sendStatus(404)
    // res.json(data2)
    // res.send('hello')
//     res.sendFile("D:/nodejs2/index.html")
// })
server.listen(process.env.PORT, ()=>{
    console.log('server started')
})