const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const Validations = require('../Validations/CreateVal')
const NonActive = require('../DAL/Schemas/NonActive')

const CalcCwtwgories = async ( ownSurveys) => {
    
    const categories = [
        "Single", "Married", "Divorced", "Widow",
        "Male", "Woman", "Jewish", "Muslims", "Christian"
    ]
    let votesPerCat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const finalResults = []
    let check = false;
    const users = [];
    for (let index = 0; index < ownSurveys.length; index++) {
        const element = ownSurveys[index];
        for (let j = 0; j < element.responses.length; j++) {
            const response = element.responses[j];
            console.log(response);
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
            if (!user.gender || user.gender === "Undefined" && !user.religion || user.religion === "Undefined" && !user.maritalStatus || user.maritalStatus === "Undefined") {
                votesPerCat[9]++;
            }

        }
        finalResults.push({ surveyId: element._id, results: votesPerCat })
        votesPerCat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    }
    return finalResults;




}
const PullSurveysByProfile = async (user) => {
    const excludeAuthorId = user._id
    const birth = new Date(user.birthDate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birth.getFullYear();
    const monthDifference = currentDate.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birth.getDate())) {
        age--;
    }
    let AgeRange
    //Under 18 18-24 25-34 35-44 45-54 55-64 65 and over
   if (age<18) {
    AgeRange="Under 18";
   }
   else if (age<25) {
    AgeRange="18-24";
   }
   else if (age<35) {
    AgeRange="25-34"
   }
   else if (age<45) {
    AgeRange="35-44"
   }
   else if (age<55) {
    AgeRange="45-54"
   }
   else if (age<65) {
    AgeRang="55-64"
   }
   else AgeRange="65 and over"
    const query = {
        author: { $ne: excludeAuthorId },
        isPublic: false,
        targetAudience: {
            $in: [
                user.religion,
                user.gender,
                user.maritalStatus,
             AgeRange,
            ]
        }
    };
    const data = await User.findOne({ username: user.username })
    const surveys = await Survey.find(query)
    return surveys;

}



module.exports = { CalcCwtwgories, PullSurveysByProfile }