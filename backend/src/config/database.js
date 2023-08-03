const mongoose = require('mongoose')

const url = process.env.MONGO_URL
    mongoose.connect(url, 
        { useNewUrlParser: true, useUnifiedTopology: true }) //obj de config para compatibilidade com outras versões do mongodb
    .then(() => 
        console.log("Conectado ao mongoDB com sucesso!"))
    .catch((error) => 
        console.log("Erro ao conectar com o mongoDB!", error))

module.exports = mongoose