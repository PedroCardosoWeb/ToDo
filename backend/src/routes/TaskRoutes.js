const express = require('express')
const router = express.Router()

const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middlewares/TaskValidation')
const MacAddressValidation = require('../middlewares/MacAddressValidation')

router.post('/', TaskValidation, TaskController.create)
router.get('/:id', TaskController.show)
router.get('/filter/all', MacAddressValidation, TaskController.all)
router.put('/:id', TaskController.update) // ':id' (dois pontos) indica uma variável, de nome 'id'
router.put('/:id/:done', TaskController.done) 
router.delete('/:id', TaskController.delete) 

module.exports = router
    