const router = require("express").Router();
const itemSuggestionController = require("../api/v1/itemSuggestion/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(itemSuggestionController.find)
  .post(
    authenticate,
    hasPermission("itemSuggestion", ["write"]),
    itemSuggestionController.create,
  )
  .delete(
    authenticate,
    hasPermission("itemSuggestion", ["delete"]),
    itemSuggestionController.destroyMany,
  );
router
  .route("/:id")
  .get(itemSuggestionController.findSingle)
  .put(
    authenticate,
    hasPermission("itemSuggestion", ["update"]),
    itemSuggestionController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("itemSuggestion", ["update"]),
    itemSuggestionController.edit,
  )
  .delete(
    authenticate,
    hasPermission("itemSuggestion", ["delete"]),
    itemSuggestionController.destroy,
  );

module.exports = router;
