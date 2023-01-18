const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    name: {type: String},
    gender: {type: Number},
    age: {type: Number},
    kind: {type: String},
    text: {type: String},
    vaccinations: {type: Boolean},
    img: {type: String}
})

module.exports = model('Animal', schema)