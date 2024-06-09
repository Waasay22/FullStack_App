
const fs = require('fs')
// const data2 = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
// const products = data2.products
const model = require('../model/product')
const Product = model.Product

exports.createProduct = async (req,res)=>{
try{
    const product = new Product(req.body)
    
    const doc = await product.save()
    console.log(doc)
    res.status(201).json(doc)
}
catch(error){
    res.status(400).json({message : error.message})

}
    // products.push(req.body)
    // res.json(req.body)
}

exports.getAllProducts  = async (req,res)=>{
    const products = await Product.find()
    res.json(products)
    // res.json(products)
}


exports.getProduct = async(req,res)=>{
    // console.log(req.params)
    const id = req.params.id
    // const id = +req.params.id
    const product = await Product.findById(id)
    res.json(product)
    // const product = products.find(p=>p.id===id)
    // res.json(product)
    // res.json({type:'GET1'})
}

exports.updateProduct = async(req,res)=>{
 
    const id = req.params.id
    // const id = +req.params.id
    try{
        const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(doc)
    }
//     const productIndex = products.findIndex(p=>p.id===id)
//    products.splice(productIndex,1,{...req.body, id:id})
//   res.status(201).json()
}

exports.updatePatchProduct = async (req,res)=>{
 
    const id = req.params.id
    // const id = +req.params.id
    try{
        const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(doc)
    }
//     const productIndex = products.findIndex(p=>p.id===id)
//     const product = products[productIndex]
//    products.splice(productIndex,1,{...product,...req.body})
//   res.status(201).json()
}


exports.deleteProduct = async(req,res)=>{
 
    const id = req.params.id
    // const id = +req.params.id
    try{
        const doc = await Product.findOneAndDelete({_id:id})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(doc)
    }
//     const productIndex = products.findIndex(p=>p.id===id)
//     const product = products[productIndex]
//    products.splice(productIndex,1)
//   res.status(201).json(product)
}