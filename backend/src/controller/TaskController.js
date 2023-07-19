const TaskModel = require('../model/TaskModel')
const { 
    startOfDay, 
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear 
} = require('date-fns')
const current = new Date()

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
        await TaskModel
            .findByIdAndUpdate({'_id': req.params.id}, //req.params - obtém o conteúdo fornecido pela requisição (variável '_id'), ao invés do corpo (body) 
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
        await TaskModel
            .find({ macaddress: 
                { '$in': req.params.macaddress } 
            })
            .sort('when') //organizando por data/hora
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async show (req, res){
        await TaskModel
            .findById(req.params.id)
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
        await TaskModel
            .deleteOne({'_id': req.params.id}) //'_id' - o '_' indica que é uma variável 
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async done(req, res){
        await TaskModel
            .findByIdAndUpdate(
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

    async late(req,res){
        await TaskModel
            .find({
                'when': {'$lt': current}, //'$lt' - operador less than
                'macaddress': {'$in': req.params.macaddress}
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async today(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {
                    '$gte': startOfDay(current), //'$gte' - greater than or equals
                    '$lte': endOfDay(current) //'$lte' - less than or equals
                }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    }

    async week(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {
                    '$gte': startOfWeek(current), 
                    '$lte': endOfWeek(current)
                }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    }

    async month(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {
                    '$gte': startOfMonth(current), 
                    '$lte': endOfMonth(current)
                }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    }

    async year(req, res){
        await TaskModel
            .find({
                'macaddress': {'$in': req.params.macaddress},
                'when': {
                    '$gte': startOfYear(current), 
                    '$lte': endOfYear(current)
                }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                res.status(500).json(error)
            })
    }

}

module.exports = new TaskController()