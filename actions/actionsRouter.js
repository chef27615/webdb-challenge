const actionsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = require('../knexfile');

const db=knex(knexConfig.development);

actionsRouter.use((req, res, next) => {
    res.status(404).json({ message:"in actionsRouter, no projects here"})
})
module.exports = actionsRouter;