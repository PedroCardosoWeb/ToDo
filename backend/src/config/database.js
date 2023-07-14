const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/todo' //url de conexão com o bd
mongoose.connect(url, { useNewUrlParser: true}) //obj de config para compatibilidade com outras versões do mongodb

module.exports = mongoose