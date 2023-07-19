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

    async all(req,res){
        await TaskModel.find({ macaddress: { '$in': req.params.macaddress } })
        .sort('when') //organizando por data/hora
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
    }

    async show (req, res){
        await TaskModel.findById(req.params.id)
            .then(response => {
                if(response)
                    return res.status(200).json(response)
                else
                    return res.status(404).json({error: 'Tarefa não encontrada!'})
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async delete (req, res){
        await TaskModel.deleteOne({'_id': req.params.id}) //'_id' - o '_' indica que é uma variável 
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async done(req, res){
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}

module.exports = new TaskController()