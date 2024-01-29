const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const jwt = require('jsonwebtoken');
const Validations = require('../Validations/CreateVal')


const Register = async (req, res) => {
    const {
        username,
        password,
        email,
        birthDate,
        phone,
        gender,
        religion,
        address,
        maritalStatus,
        countryOfOrigin,

    } = req.body
    const data = {
        username,
        password,
        email,
        birthDate,
        phone,
        gender,
        religion,
        address,
        maritalStatus,
        countryOfOrigin,
    }
    try {
        const newdtata = await Validations.EncrypPassword(data)
        const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET || 'your_fallback_secret', { expiresIn: '1h' });
        res.status(200).json({ token, mode:"UserHomePage" });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }

}
const GetguestToken=async(req,res)=>{
    try {
        const token = jwt.sign({ userId: "guest" }, 'your-secret-key', {
            expiresIn: '1h',
            });        
            res.status(200).json({ token, mode:"guest" });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
const SignIn=async(req,res)=>{
    try {
        const token = jwt.sign({ userId: "guest" }, 'your-secret-key', {
            expiresIn: '1h',
            });        
            res.status(200).json({ token, mode:"UserHomePage" });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
const PublishSuervey = async (req, res) => {
    console.log('hallo from PublishSuervey');
}
module.exports = {  Register,GetguestToken,SignIn, PublishSuervey }