
const fs = require('fs')
const path = require('path')
const data2 = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json'), 'utf-8'))
const users = data2.users

exports.createUser = (req,res)=>{
    users.push(req.body)
    res.json(req.body)
}

exports.getAllUsers  = (req,res)=>{
    res.json(users)
}


exports.getUser = (req,res)=>{
    console.log(req.params)
    const id = +req.params.id
    const user = users.find(p=>p.id===id)
    res.json(user)
    // res.json({type:'GET1'})
}

exports.updateUser = (req,res)=>{
 
    const id = +req.params.id
    const userIndex = users.findIndex(p=>p.id===id)
   users.splice(userIndex,1,{...req.body, id:id})
  res.status(201).json()
}

exports.updatePatchUser = (req,res)=>{
 
    const id = +req.params.id
    const userIndex = users.findIndex(p=>p.id===id)
    const user = users[userIndex]
   users.splice(userIndex,1,{...user,...req.body})
  res.status(201).json()
}


exports.deleteUser = (req,res)=>{
 
    const id = +req.params.id
    const userIndex = users.findIndex(p=>p.id===id)
    const user = users[userIndex]
   users.splice(userIndex,1)
  res.status(201).json(user)
}