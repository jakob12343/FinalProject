const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const NonActive = require('../DAL/Schemas/NonActive')
const Validations = require('../Validations/CreateVal')



const PullUserDetails = async (req, res) => {
    const { Username, usertoken } = req.query
    const IsExist = await Validations.CheckUser(usertoken)
    if (IsExist) {
        try {
            const data = await User.findOne({ username: Username })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}
const ForgotPassword = async (req, res) => {
    const { username, phone } = req.query
    try {
        const data = await User.findOne({ username });
        if (data) {
            if (data.phone === phone)
                res.status(200).json({ message: "User found." });
            else res.status(409).json({ message: "wrong details" });

        } else {
            // User not found
            res.status(409).json({ message: "User not found." });
        }
    } catch (error) {
        console.error("ForgotPassword error:", error);
        res.status(500).json({ message: "An error occurred." });
    }

}
const PullAllSurveys = async (req, res) => {
    const { Username, usertoken } = req.query
    const IsExist = await Validations.CheckUser(usertoken)
    if (IsExist) {

        const data = await User.findOne({ username: Username })
        const excludeAuthorId = data._id
        const surveys = await Survey.find({ author: { $ne: excludeAuthorId }, isPublic: true })
        res.status(200).json(surveys)
    }
    
    else res.status(409).json({ message: "invalid user token" })
}

const PullUserSurveys = async (req, res) => {
    const { Username, usertoken } = req.query
    const IsExist = await Validations.CheckUser(usertoken)
    if (IsExist) {
        const data = await User.findOne({ username: Username })
        const surveys = await Survey.find({ author: data._id })
        res.status(200).json(surveys)
    }
    else res.status(409).json({ message: "invalid user token" })


}
const PullOldUserSurveys = async (req, res) => {
    const { Username, usertoken } = req.query
    const IsExist = await Validations.CheckUser(usertoken)
    if (IsExist) {
        const data = await User.findOne({ username: Username })
        const surveys = await NonActive.find({ author: data._id })
        res.status(200).json(surveys)
    }
    else res.status(409).json({ message: "invalid user token" })
}
const ReadPublicSurveys=async(req,res)=>{
try {
    const surveys = await Survey.find({  isPublic: true })
    res.status(200).json(surveys)
    console.log(surveys);

} catch (error) {
    res.status(404).json({message: "error fatching surveys"})
}    

}

module.exports = {  PullUserDetails, ForgotPassword, PullUserSurveys, PullOldUserSurveys, PullAllSurveys,ReadPublicSurveys }