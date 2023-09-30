const find = require("./find");
const findSingle = require("./findSingle");
const create = require("./create");
const edit = require("./edit");
const updateOrCreate = require("./update");
const destroy = require("./destroy");
const findSeller = require("./seller/find");
const destroyMany = require("./destroyMany");
const ItemSuggestion = require("./itemSuggestion");
module.exports = {
  find,
  findSingle,
  create,
  updateOrCreate,
  edit,
  destroy,
  findSeller,
  destroyMany,
  ItemSuggestion,
};
