const findAll = require("./findAll");
const findSingle = require("./findSingle");
const create = require("./create");
const updateOrCreate = require("./updateOrCreate");
const edit = require("./edit");
const destroy = require("./destroy");
const destroyMany = require("./destroyMany");
const userSelf = require("./userSelf");
const changePassword = require("./changePassword");

module.exports = {
  findAll,
  findSingle,
  create,
  updateOrCreate,
  edit,
  destroy,
  destroyMany,
  userSelf,
  changePassword,
};
