const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const jwt = require('jsonwebtoken');
const Validations = require('../Validations/CreateVal')
const tokens = require('./Localfiles/Tokens')
const NonActive = require('../DAL/Schemas/NonActive')

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
        const isExist = await User.find({ username: data.username })
        if (isExist.length) {
            return res.status(409).json({ message: "Username already exists." });

        }
        const isSucsses = await User.create(newdtata)
        const surveys = await Survey.find({ author: isSucsses._id })
        const OldSurveys = await NonActive.find({ author: isSucsses._id })
        const Allsurveys = await Survey.find({ author: { $ne: isSucsses._id } })
        const SharedObject =
        {
            user: isSucsses,
            OldSurveys,
            Allsurveys,
            surveys
        }
        const token = jwt.sign({ userId: "user" }, process.env.JWT_SECRET || 'your_fallback_secret', { expiresIn: '1h' });
        tokens.userTokens.push(token)
        const { iat, exp } = jwt.decode(token)

        res.status(200).json({ token, mode: "UserHomePage", iat, exp,userdetails: SharedObject });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }

}
const GetNewToken = (req, res) => {
    const { usertoken } = req.body.usertoken
    try {
        const mode = jwt.decode(usertoken)
        if (mode.mode === "guest") {
            tokens.guestTokens.filter(usertoken)
            usertoken = jwt.sign({ userId: "guest" }, 'your-secret-key', {
                expiresIn: '1h',
            });
            const { iat, exp } = jwt.decode(usertoken)

            tokens.guestTokens.push(usertoken)
            res.status(200).json({ usertoken, mode: "guest", iat, exp });
        }
        else {
            if (mode.mode === "user") {
                userTokens.filter(usertoken)
                tokens.usertoken = jwt.sign({ userId: "user" }, 'your-secret-key', {
                    expiresIn: '1h',
                });
                const { iat, exp } = jwt.decode(usertoken)

                tokens.userTokens.push(usertoken)
                res.status(200).json({ usertoken, mode: "guest", iat, exp });
            }
        }

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
const GetguestToken = async (req, res) => {
    try {
        const token = jwt.sign({ userId: "guest" }, 'your-secret-key', {
            expiresIn: '1h',
        });

        tokens.guestTokens.push(token)
        const { iat, exp } = jwt.decode(token)

        res.status(200).json({ token, mode: "guest", iat, exp });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
const SignIn = async (req, res) => {

    try {
        const isSucsses = await User.findOne({ username: req.body.username })

        if (isSucsses) {
            const match = await Validations.CheckPassword({ pass1: isSucsses.password, pass2: req.body.password })
            if (match) {
                const token = jwt.sign({ userId: "user" }, 'your-secret-key', {
                    expiresIn: '1h',
                });
                const surveys = await Survey.find({ author: isSucsses._id })
                const OldSurveys = await NonActive.find({ author: isSucsses._id })
                const Allsurveys = await Survey.find({ author: { $ne: isSucsses._id } })
                const SharedObject =
                {
                    user: isSucsses,
                    OldSurveys,
                    Allsurveys,
                    surveys
                }
                tokens.userTokens.push(token)
                const { iat, exp } = jwt.decode(token)
                res.status(200).json({
                    token,
                    mode: "UserHomePage",
                    iat,
                    exp,
                    userdetails: SharedObject
                });
            }
            else res.status(401).json({ message: "incurrect password" })
        }
        else res.status(401).json({ message: "cannot find user name" })




    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
const PublishSuervey = async (req, res) => {
    const { survey, Data } = req.body
    const newSurvey = {
        author: Data._id,
        title: survey.title,
        category: survey.category,
        questions: survey.question,
        duration: survey.duration,
        isPublic: survey.isPublic,
        targetAudience: survey.targetAudience,
        purpose: survey.purpose,

    }
    const IsSucsses = await Survey.create(newSurvey)
    res.status(200).json({ status: " ok" })
}
module.exports = { Register, GetguestToken, SignIn, PublishSuervey, GetNewToken }