// requires
const express = require('express');
const cors = require('cors');
const Get = require('./Controllers/Read');
const Create = require('./Controllers/Create');
const Delete = require('./Controllers/Delete');
const Update = require('./Controllers/Update');
const Middlewares = require('./Controllers/MiddleWares');
const DataBase = require('./DAL/DB');
require('dotenv').config();

const app = express();

// CORS options to allow any origin
const corsOptions = {
  origin: '*', // Allow any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials if needed
  optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS with options
app.use(cors(corsOptions));

// Middleware to add headers manually to allow any origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  console.log('CORS headers set for', req.path);
  next();
});

// Handle preflight requests
app.options('*', cors(corsOptions));

// middlewares
app.use(express.json());

// activate DB
DataBase();

// CRUD Operations
// Posts
app.post('/Register', (req, res) => { Create.Register(req, res); });
app.post('/PublishSuervey', (req, res) => { Create.PublishSuervey(req, res); });
app.post('/GetguestToken', (req, res) => { Create.GetguestToken(req, res); });
app.post('/SignIn', Middlewares.RefreshSurveyListByDate, (req, res) => { Create.SignIn(req, res); });
app.post('/GetNewToken', (req, res) => { Create.GetNewToken(req, res); });
// Reads
app.get('/Login', (req, res) => { Get.Login(req, res); });
app.get('/PullUserDetails', (req, res) => { Get.PullUserDetails(req, res); });
app.get('/ForgotPassword', (req, res) => { Get.ForgotPassword(req, res); });
app.get('/PullUserSurveys', (req, res) => { Get.PullUserSurveys(req, res); });
app.get('/PullOldUserSurveys', (req, res) => { Get.PullOldUserSurveys(req, res); });
app.get('/PullAllSurveys', (req, res) => { Get.PullAllSurveys(req, res); });
app.post('/GetSurveys', (req, res) => { Create.GetSurveys(req, res); });
app.get('/ReadPublicSurveys', (req, res) => { Get.ReadPublicSurveys(req, res); });
// Updates
app.put('/UpdateUserDetails', (req, res) => { Update.UpdateUserDetails(req, res); });
app.put('/Vote', (req, res) => { Update.Vote(req, res); });
app.put('/EditPasword', (req, res) => { Update.EditPasword(req, res); });
// Deletes
app.delete('/DeletTargetSurvey', (req, res) => { Delete.DeleteSurvey(req, res); });
app.get('/Check', (req, res) => { res.status(200).json({ message: "this is check from vercel" }); });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
