const bcrypt = require('bcrypt');
const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const EncrypPassword=async(data)=>{
    const salt = await bcrypt.genSalt(10);
     data.password = await bcrypt.hash(data.password, salt);

     return data;
}


module.exports={ EncrypPassword}