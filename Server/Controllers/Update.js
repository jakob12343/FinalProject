const User= require('../DAL/Schemas/UserSchema')
const Survey=require('../DAL/Schemas/SurveySchema')
const Validations = require('../Validations/CreateVal')

const Update=async(req,res)=>{
   
   
}
const UpdateUserDetails=async(req,res)=>{
    const IsExist=await Validations.CheckUser(req.query)
    if (IsExist) {
        const data=await User.findByIdAndUpdate(req.body._id, req.body)
    }
    res.status(200).json({status: "ok"})
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
    const IsExist=await Validations.CheckUser(req.query)
    if (IsExist) {
        const data=await Survey.findByIdAndUpdate(req.body._id, req.body)
    }
    res.status(200).json({status: "ok"})    
}
module.exports={Update,UpdateUserDetails,Vote,EditPasword}