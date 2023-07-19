const TaskModel = require('../model/TaskModel')

class TaskController {
    async create(req, res){
        const task =  new TaskModel(req.body)
        await task
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            }) 
    }

    async update(req, res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, //req.params - obtém o conteúdo fornecido pela requisição (variável '_id'), ao invés do corpo (body) 
                                                  req.body, 
                                                  {new: true}) //devolve a nova tarefa, atualizada (conforme requisição)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
    }

}

module.exports = new TaskController()