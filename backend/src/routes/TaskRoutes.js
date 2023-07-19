const express = require('express')
const router = express.Router()

const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middlewares/TaskValidation')

router.post('/', TaskValidation, TaskController.create)
router.put('/:id', TaskController.update) // ':id' (dois pontos) indica uma variável, de nome 'id'
module.exports = router
    