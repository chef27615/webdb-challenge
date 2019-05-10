const projectsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db=knex(knexConfig.development);

projectsRouter.use((req, res, next) => {
    res.status(404).json({ message:"in projectRouter, no projects here"})
})
module.exports = projectsRouter;