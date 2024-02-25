const bcrypt = require('bcrypt');
const User = require('../DAL/Schemas/UserSchema')
const Survey = require('../DAL/Schemas/SurveySchema')
const jwt = require('jsonwebtoken');
const {userTokens, guestTokens}=require('../Controllers/Localfiles/Tokens')

const EncrypPassword=async(data)=>{
    const salt = await bcrypt.genSalt(10);
     data.password = await bcrypt.hash(data.password, salt);
     return data;
}
const CheckPassword=async(data)=>{
   const match = await bcrypt.compare(data.pass2, data.pass1);
   return match

}
const CheckUser=(token)=>{
const check =userTokens.map(el=>{
   if(el===token)
   return true
})
return check
}

module.exports={ EncrypPassword,CheckPassword,CheckUser}