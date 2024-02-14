// requires
const express=require('express')
const Get=require('./Controllers/Read')
const Create=require('./Controllers/Create')
const Delete=require('./Controllers/Delete')
const Update=require('./Controllers/Update')
const DataBase =require('./DAL/DB')
const cors=require('cors')
require('dotenv').config();


const port =3000;
const app=express()

// middlewares
app.use(express.json())
app.use(cors())
// activate DB
DataBase();

//////////////// CRUD////////////////

// Posts
app.post('/Register', (req,res)=>{Create.Register(req,res)})
app.post('/PublishSuervey', (req,res)=>{Create.PublishSuervey(req,res)})
app.post('/GetguestToken', (req,res)=>{Create.GetguestToken(req,res)})
app.post('/SignIn' ,(req,res)=>{Create.SignIn(req,res)})
app.post('/GetNewToken', (req,res)=>{Create.GetNewToken(req,res)})
// Reads
app.get('/Login', (req,res)=>{Get.Login(req,res)})
app.get('/PullUserDetails', (req,res)=>{Get.PullUserDetails(req,res)})
app.get('/ForgotPassword', (req,res)=>{Get.ForgotPassword(req,res)})
//Updates
app.put('/UpdateDetails', (req,res)=>{Update.UpdateDetails(req,res)})
app.put('/Vote', (req,res)=>{Update.Vote(req,res)})
app.put('/EditPasword', (req,res)=>{Update.EditPasword(req,res)})
//Deletes
app.delete('/DeleteSurvey', (req,res)=>{Delete.DeleteSurvey(req,res)})



app.listen(port, ()=>{console.log(`server running on port ${port}`);})