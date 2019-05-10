const projectsRouter = require('express').Router();
const knex = require('knex');
const knex_populate = require('knex-populate');


const knexConfig = require('../knexfile');

const db=knex(knexConfig.development);

projectsRouter.get('/', (req, res) => {
    db('projects')
    .then(projects => {
        projects ? res.status(200).json(projects) : res.status(404).json({message:"no projects yet"})
    })
    .catch(err => {res.status(500).json(500)})
})

projectsRouter.post('/', (req, res) => {
    db('projects')
    .insert(req.body)
    .then(project => {
        const [id] = project;
        db('projects')
        .where({id})
        .then(newProject => {
            newProject ? res.status(201).json(newProject) : res.status(400).json({message:"some required fields need input"})
        })
    })
    .catch(err => {res.status(500).json(err)})
})

projectsRouter.get('/:id', (req, res) => {
    knex_populate(db, 'projects')
    .findById(req.params.id)
    .populate('actions', 'project_id', 'actions')
    .exec()
    .then(project => {
        project ? res.status(200).json(project) : res.status(404).json({message:"some required fields need input"})
    })
    .catch(err=>{res.status(500).json(err)})
    // .then(results => res.send(results).first());
})

projectsRouter.delete('/:id', (req, res) => {
    db('projects')
    .where({id:req.params.id})
    .del()
    .then(count=> {
        count > 0 ? res.status(200).json({ message: "project deleted"}) : res.status(404).json({ message:"can not delete a none exist project"})
    })
    .catch(err => {res.status(500).json(err)})
})

projectsRouter.put('/:id', (req, res) => {
    db('projects')
    .where({id:req.params.id})
    .update(req.body)
    .then(count => {
        count > 0 ? db('projects').where({id:req.params.id}).first().then(project => {res.status(200).json(project)}) : res.status(404).json({message:"can not update a none project"})
    })
})

projectsRouter.use((req, res, next) => {
    res.status(404).json({ message:"in projectRouter, no projects here"})
})
module.exports = projectsRouter;