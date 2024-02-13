const User= require('../DAL/Schemas/UserSchema')
const Survey=require('../DAL/Schemas/SurveySchema')
const Validations = require('../Validations/CreateVal')

const Update=async(req,res)=>{
   
   
}
const UpdateDetails=async(req,res)=>{
    console.log("hallo from updates");
}
const EditPasword=async(req,res)=>{
const {newPassword, username}=req.body

let data= await User.findOne({username})
data.password=newPassword
const newData = await Validations.EncrypPassword(data)

data=await User.findByIdAndUpdate(data._id, newData)
console.log(data);
res.status(200).json({mssege: "password updated"})

}
const Vote=async(req,res)=>{
    console.log("hallo from Vote");
}
module.exports={Update,UpdateDetails,Vote,EditPasword}