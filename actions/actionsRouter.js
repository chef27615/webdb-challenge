const actionsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db=knex(knexConfig.development);

actionsRouter.get('/', (req, res) => {
    db('actions')
    .then(actions => {
        actions ? res.status(200).json(actions) : res.status(404).json({message:"no actions yet"})
    })
    .catch(err => {res.status(500).json(err)})
})

actionsRouter.post('/', (req, res) => {
    db('actions')
    .insert(req.body)
    .then(action => {
        const [id] = action;
        db('actions')
        .then(newAction => {
            newAction ? res.status(201).json(newAction) : res.status(400).json({message: "some required field need input"}) 
        })
    })
    .catch(err=>{ res.status(500).json(err)})
})

actionsRouter.use((req, res, next) => {
    res.status(404).json({ message:"in actionsRouter, no projects here"})
})
module.exports = actionsRouter;