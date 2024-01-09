const User= require('../DAL/Schemas/UserSchema')
const Survey=require('../DAL/Schemas/SurveySchema')

const Update=async(req,res)=>{
   
   
}
const UpdateDetails=async(req,res)=>{
    console.log("hallo from updates");
}
const Vote=async(req,res)=>{
    console.log("hallo from Vote");
}
module.exports={Update,UpdateDetails,Vote}