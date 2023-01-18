const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true, sparse:true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true},
    animals: [{type: Types.ObjectId, ref: 'Animal'}]
})

module.exports = model('User', schema)