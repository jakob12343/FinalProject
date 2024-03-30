const User= require('../DAL/Schemas/UserSchema')
const Survey=require('../DAL/Schemas/SurveySchema')
const Validations = require('../Validations/CreateVal')
const NonActive=require('../DAL/Schemas/NonActive')


const RefreshSurveyListByDate=async(req, res, next)=>{
    let Time= new Date().getTime()
    const AllSurveys=await Survey.find()
    for (let index = 0; index < AllSurveys.length; index++) {
        const survey = AllSurveys[index];
        if (Time>new Date(survey.duration).getTime()) {

            const deletedSurvey=await Survey.findByIdAndDelete(survey._id)
            if (deletedSurvey) {
                const deleted={
                    author :deletedSurvey.author,
                     title: deletedSurvey.title,
                     category: deletedSurvey.category,
                     questions: deletedSurvey.questions,
                     isPublic: deletedSurvey.isPublic,
                     targetAudience: deletedSurvey.targetAudience,
                     purpose: deletedSurvey.purpose,
                     responses: deletedSurvey.responses
                 }
               await NonActive.create(deleted)
            }
        
       }
    }

    next();

}


module.exports = { RefreshSurveyListByDate }