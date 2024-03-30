const mongoose =require('mongoose')
const NonActive= new mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        category: { type: String, required: true },
        questions: [{
          text: { type: String, required: true },
          options: [{ type: String, required: true }],
        }],
        isPublic: { type: Boolean, required: true },
        targetAudience: [{ type: String }], 
        purpose: String,
        responses: [{
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          answers: [{ type: String }]
      
          }]
        }
)
module.exports = mongoose.model('NonActive', NonActive)