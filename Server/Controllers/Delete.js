const User= require('../DAL/Schemas/UserSchema')
const Survey=require('../DAL/Schemas/SurveySchema')
const Validations = require('../Validations/CreateVal')
const NonActive=require('../DAL/Schemas/NonActive')
const Delete=async(req,res)=>{
   
   
}
const DeleteSurvey=async(req,res)=>{
    const IsExist=await Validations.CheckUser(req.query.usertoken)
   const {Username}=req.query
    if (IsExist) {
        const IsSucsses=await Survey.findByIdAndDelete(req.query._id)
        
        if (IsSucsses) {
            const deleted={
                author :IsSucsses.author,
                 title: IsSucsses.title,
                 category: IsSucsses.category,
                 questions: IsSucsses.questions,
                 isPublic: IsSucsses.isPublic,
                 targetAudience: IsSucsses.targetAudience,
                 purpose: IsSucsses.purpose,
                 responses: IsSucsses.responses
             }
            
             
             await NonActive.create(deleted)
             const data = await User.findOne({ username: Username })
             const surveys = await Survey.find({ author: data._id })
             const OldSurveys= await NonActive.find({ author: data._id })
            res.status(200).json({messege: "the survey is deleted",surveys, OldSurveys})
        }
        else res.status(404).json({messege: "survey not found"})
    }
    else res.status(409).json({messege: "user not found"})

}
module.exports={Delete,DeleteSurvey}