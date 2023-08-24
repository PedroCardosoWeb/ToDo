const express =  require('express') //importa o módulo express no arquivo
const cors = require('cors')
require('dotenv').config()

const server = express() //inicializa o express em server
server.use(cors())
server.use(express.json())

const TaskRoutes = require('./routes/TaskRoutes')
server.use('/task', TaskRoutes)

const PORT = process.env.PORT || 3333

server.get('/', (req,res) => {
    res.send('Hello, Vercel Ok!')
})

server.listen(PORT, () => {
    console.log('API ONLINE')
})