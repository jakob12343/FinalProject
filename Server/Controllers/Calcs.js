const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const Validations = require('../Validations/CreateVal')
const NonActive = require('../DAL/Schemas/NonActive')

const CalcCwtwgories = async (oldSurveys, ownSurveys) => {
    const categories = [
        "Single", "Married", "Divorced", "Widow",
        "Male", "Woman", "Jewish", "Muslims", "Christian"
    ]
    let votesPerCat = [0, 0, 0, 0, 0, 0, 0, 0, 0,0];
    const finalResults=[]
    let check = false;
    const users = [];
    for (let index = 0; index < ownSurveys.length; index++) {
        const element = ownSurveys[index];
        for (let j = 0; j < element.responses.length; j++) {
            const response = element.responses[j];
            let user = await User.findById(response.user);
            users.push(user);
            if (user.gender && user.gender !== "Undefined") {
                votesPerCat[categories.indexOf(user.gender)]++;
            }
            if (user.religion && user.religion !== "Undefined") {
                votesPerCat[categories.indexOf(user.religion)]++;
            }
            if (user.maritalStatus && user.maritalStatus !== "Undefined") {
                votesPerCat[categories.indexOf(user.maritalStatus)]++;
            }
            if (!user.gender || user.gender === "Undefined"&&!user.religion ||user.religion === "Undefined"&&!user.maritalStatus || user.maritalStatus === "Undefined") {
                votesPerCat[9]++;
            }
           
        }
        finalResults.push({surveyId: element._id, results: votesPerCat})
        votesPerCat = [0, 0, 0, 0, 0, 0, 0, 0, 0,0];

    }
    return finalResults;




}
module.exports = { CalcCwtwgories }