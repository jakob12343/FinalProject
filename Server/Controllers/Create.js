const User= require('../DAL/Schemas/UserSchema')
const Survey=require('../DAL/Schemas/SurveySchema')

const Create=async(req,res)=>{
   
   
}
const CreateNewUser=async(req,res)=>{
    console.log("hallo from CreateNewUser");
}
const PublishSuervey=async(req,res)=>{
    console.log('hallo from PublishSuervey');
}
module.exports={Create,CreateNewUser,PublishSuervey}