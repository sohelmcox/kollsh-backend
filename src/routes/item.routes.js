const router = require("express").Router();
const { controllers } = require("../api/v1/item");
const authenticate = require("../middleware/authenticate");
const hasOwnership = require("../middleware/hasOwnership");
const { hasPermission } = require("../middleware/hasPermission");
const userSuggestion = require("../middleware/userSuggestion");

router
  .route("/")
  .get(controllers.find)
  .post(authenticate, hasPermission("item", ["write"]), controllers.create)
  .delete(
    authenticate,
    hasPermission("item", ["delete"]),
    // hasOwnership("Item", "seller"),
    controllers.destroyMany,
  );

// router.route("/slug").get(controllers.findSingle);
router
  .route("/:id")
  .get(userSuggestion, controllers.findSingle)
  .put(
    authenticate,
    hasPermission("item", ["update"]),
    controllers.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("item", ["update"]),
    hasOwnership("Item", "seller"),
    controllers.edit,
  )
  .delete(
    authenticate,
    hasPermission("item", ["delete"]),
    hasOwnership("Item", "seller"),
    controllers.destroy,
  );

// seller
router.route("/:id/seller").get(controllers.findSeller);
router.route("/:id/:userId/item-suggestion").get(controllers.ItemSuggestion);
module.exports = router;
