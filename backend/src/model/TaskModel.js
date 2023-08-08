const mongoose = require('../config/database')
const Schema = mongoose.Schema //representação das informações definidas para serem armazenadas no mongobd

const TaskSchema = new Schema({
    macaddress: {type: String, required: true},
    type:{type:Number, required: true},
    title:{type:String, required: true},
    description:{type:String, required: true},
    when:{type: Date, required: true},
    done:{type: Boolean, default: false},
    created:{type: Date, default: Date.now()}
})

module.exports = mongoose.model('Task', TaskSchema) //o primeiro param é como será salvo no bd e o segundo é o obj criado neste arq
