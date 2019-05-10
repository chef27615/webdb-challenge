
const cleaner = require('knex-cleaner');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return cleaner.clean(knex);
};
