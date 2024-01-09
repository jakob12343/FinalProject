// requires
const express=require('express')
const Get=require('./Controllers/Read')
const Post=require('./Controllers/Create')
const Delete=require('./Controllers/Delete')
const Update=require('./Controllers/Update')
const DataBase =require('./DAL/DB')


const port =3000;
const app=express()

// middlewares
app.use(express.json())

// activate DB
DataBase();

//////////////// CRUD////////////////

// Posts
app.post('/CreateNewUser', (req,res)=>{Post.CreateNewUser(req,res)})
app.post('/PublishSuervey', (req,res)=>{Post.PublishSuervey(req,res)})

// Reads
app.get('/Login', (req,res)=>{Get.Login(req,res)})

//Updates
app.put('/UpdateDetails', (req,res)=>{Update.UpdateDetails(req,res)})
app.put('/Vote', (req,res)=>{Update.Vote(req,res)})
//Deletes
app.delete('/DeleteSurvey', (req,res)=>{Delete.DeleteSurvey(req,res)})



app.listen(port, ()=>{console.log(`server running on port ${port}`);})