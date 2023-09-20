const router = require("express").Router();
const itemSuggestionController = require("../api/v1/itemSuggestion/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(itemSuggestionController.find)
  .post(authenticate, itemSuggestionController.create)
  .delete(authenticate, itemSuggestionController.destroyMany);
router
  .route("/:id")
  .get(itemSuggestionController.findSingle)
  .put(authenticate, itemSuggestionController.updateOrCreate)
  .patch(authenticate, itemSuggestionController.edit)
  .delete(authenticate, itemSuggestionController.destroy);

module.exports = router;
