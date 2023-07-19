const express = require('express')
const router = express.Router()

const TaskController = require('../controller/TaskController')
const TaskValidation = require('../middlewares/TaskValidation')
const MacAddressValidation = require('../middlewares/MacAddressValidation')

router.post('/', TaskValidation, TaskController.create)
router.get('/:id', TaskController.show)
router.get('/filter/all:macaddress', TaskController.all)
router.get('/filter/late:macaddress', TaskController.late)
router.get('/filter/today:macaddress', TaskController.today)
router.get('/filter/week:macaddress', TaskController.today)
router.get('/filter/month:macaddress', TaskController.month)
router.get('/filter/year:macaddress', TaskController.year)
router.put('/:id', TaskController.update) // ':id' (dois pontos) indica uma variável, de nome 'id'
router.put('/:id/:done', TaskController.done) 
router.delete('/:id', TaskController.delete) 

module.exports = router
    