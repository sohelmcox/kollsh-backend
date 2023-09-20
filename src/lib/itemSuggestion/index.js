const findAll = require("./findAll");
const findSingle = require("./findSingle");
const create = require("./create");
const updateOrCreate = require("./updateOrCreate");
const edit = require("./edit");
const destroy = require("./destroy");
const destroyMany = require("./destroyMany");

module.exports = {
  findAll,
  findSingle,
  create,
  updateOrCreate,
  edit,
  destroy,
  destroyMany,
};
