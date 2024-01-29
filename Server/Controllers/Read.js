const User= require('../DAL/Schemas/UserSchema')
const Survey=require('../DAL/Schemas/SurveySchema')

const Read=async(req,res)=>{
   
   
}
const Login=async(req,res)=>{
    console.log("login sucsses");
}
const PullUserDetails=async(req,res)=>{
    console.log(req.body);
}
const CheckUserName=async(req,res)=>{
    res.status(200).json({ check: true});

}

module.exports={Read,Login,PullUserDetails,CheckUserName}