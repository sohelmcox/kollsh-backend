const find = require("./find");
const findSingle = require("./findSingle");
const create = require("./create");
const edit = require("./edit");
const updateOrCreate = require("./update");
const destroy = require("./destroy");
const findComment = require("./findComment");
const createComment = require("./createComment");

module.exports = {
  find,
  findSingle,
  create,
  updateOrCreate,
  edit,
  destroy,
  findComment,
  createComment,
};
