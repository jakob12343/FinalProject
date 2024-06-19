const mongoose = require('mongoose')


const uploaddb = () => {
    const db = mongoose.connection
    const mongoUrl = `mongodb://localhost:27017/SuveySay`
    mongoose.connect(mongoUrl)
    db.on('error', (error) => { console.log(error); })
    db.once('connected', () => { console.log(`db is running`); })
}
module.exports = uploaddb
