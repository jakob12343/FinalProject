const mongoose =require('mongoose')
const User= new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        birthDate: { type: Date, required: true },
        phone: { type: String, required: true },
        gender: String,
        religion: String,
        address: String,
        maritalStatus: String,
        countryOfOrigin: String,
        
    }
)
module.exports = mongoose.model('User', User)