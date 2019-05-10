const projectsRouter = require('express').Router();
const knex = require('knex');

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
    db('projects')
    .where({id:req.params.id})
    .first()
    .then(project => {
        project ? res.status(200).json(project) : res.status(404).json({ message:"can not locate project"})
    })
    .catch(err => {res.status(500).json(err)})
})


projectsRouter.get('/:id/actions', (req, res) => {
    db('projects')
    .join('actions', 'actions.project_id', 'project.id')
    .select('actions.id', 'actions.description')
    .where('project_id', req.params.id)
    .first()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {res.status(500).json(err)})
})



projectsRouter.use((req, res, next) => {
    res.status(404).json({ message:"in projectRouter, no projects here"})
})
module.exports = projectsRouter;