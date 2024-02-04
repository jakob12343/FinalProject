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
        const isExist=  await User.find({username: data.username})
        if (isExist.length) {
            return res.status(409).json({ message: "Username already exists." });

        }
        const isSucsses = await User.create(newdtata)
        const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET || 'your_fallback_secret', { expiresIn: '1h' });
        res.status(200).json({ token, mode: "UserHomePage" });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }

}
const GetguestToken = async (req, res) => {
    try {
        const token = jwt.sign({ userId: "guest" }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token, mode: "guest" });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
const SignIn = async (req, res) => {
    try {
        const isSucsses = await User.find({username: req.body.user.username})
        if (isSucsses.length) {
            const match= await Validations.CheckPassword({pass1: isSucsses[0].password, pass2: req.body.user.password })
      if (match) {
        const token = jwt.sign({ userId: "guest" }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token, mode: "UserHomePage" });
      }
      else res.status(401).json({message: "incurrect password"})
        }
        else res.status(401).json({message: "cannot find user name"})
      

       

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
const PublishSuervey = async (req, res) => {
    console.log('hallo from PublishSuervey');
}
module.exports = { Register, GetguestToken, SignIn, PublishSuervey }