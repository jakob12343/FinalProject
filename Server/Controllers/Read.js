const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const Validations = require('../Validations/CreateVal')

const Read = async (req, res) => {


}
const Login = async (req, res) => {
    console.log("login sucsses");
}
const PullUserDetails = async (req, res) => {
    const {Username,usertoken}=req.query
   const IsExist=await Validations.CheckUser(usertoken)
   if (IsExist) {
    try {
        const data=await User.findOne({username:Username})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error})
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


module.exports = { Read, Login, PullUserDetails, ForgotPassword }