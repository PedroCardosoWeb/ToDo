const TaskModel = require('../model/TaskModel')
const { isPast } = require ('date-fns')

const TaskValidation = async (req, res, next) => {
    const {macaddress, type, title, description, when} = req.body
    if(!macaddress)
        return res.status(400).json({ error: 'MacAddress é obrigatório!'})
        else if (!type)
            return res.status(400).json({ error: 'Tipo é obrigatório!'})
            else if (!title)
                return res.status(400).json({ error: 'Título é obrigatório!'})
                else if (!description)
                    return res.status(400).json({ error: 'Descrição é obrigatória!'})
                    else if (!when)
                        return res.status(400).json({ error: 'Data e Hora são obrigatórios!'})
                        else {
                                let exists

                                if(req.params.id){ 
                                    exists = await TaskModel.findOne({
                                        '_id': {'$ne': req.params.id}, //'$ne' = not exists - exclui o próprio id da verificação
                                        'when': {'$eq': new Date(when)}, //para verificar se é um update da própria tarefa, permitindo "atualização", ainda que na mesma data
                                        'macaddress': {'$in': macaddress}
                                    })
                                } else {
                                    if (isPast(new Date(when)))
                                        return res.status(400).json({ error: 'Não é possível agendar um compromisso no passado :( '})
                                    exists = await TaskModel.findOne({
                                        'when': {'$eq': new Date(when)}, //'$eq' operador equals
                                        'macaddress': {'$in': macaddress} //'$in' operador in (contains)
                                    })
                                }
                               
                                if(exists){
                                    return res.status(400).json({ error: 'Já existe um compromisso nesta data!'})
                                }
                                next()
                            }
}

module.exports =  TaskValidation