const mongoose =require('mongoose')
const Survey= new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        authorUsername: {type: String},
        title: { type: String, required: true },
        category: { type: String, required: true },
        questions: [{
          text: { type: String, required: true },
          options: [{ type: String, required: true }],
        }],
        duration: { type: Date, required: true },
        isPublic: { type: Boolean, required: true },
        targetAudience: [{ type: String }], 
        purpose: String,
        responses: [{
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          option: { type: Number}
      
          }]
        }
)
module.exports = mongoose.model('Survey', Survey)