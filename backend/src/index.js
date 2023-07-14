const express =  require('express') //importa o módulo express no arquivo
const server = express() //inicializa o express em server

server.get('/teste', (req, res) => {
    res.send('TUDO CERTO COM A NOSSA API!')
})

server.listen(3000, () => {
    console.log('API ONLINE')
})