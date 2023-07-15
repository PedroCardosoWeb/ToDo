const express =  require('express') //importa o módulo express no arquivo
const server = express() //inicializa o express em server
server.use(express.json())

const TaskRoutes = require('./routes/TaskRoutes')
server.use('/task', TaskRoutes)

server.listen(3000, () => {
    console.log('API ONLINE')
})