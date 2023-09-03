const router = require("express").Router();
const { controllers } = require("../api/v1/item");
const authenticate = require("../middleware/authenticate");
const hasOwnership = require("../middleware/hasOwnership");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(controllers.find)
  .post(authenticate, hasPermission("item", ["write"]), controllers.create)
  .delete(controllers.destroyMany);

// router.route("/slug").get(controllers.findSingle);
router
  .route("/:id")
  .get(controllers.findSingle)
  .put(controllers.updateOrCreate)
  .patch(
    authenticate,
    hasPermission("item", ["write"]),
    hasOwnership("Item", "seller"),
    controllers.edit,
  )
  .delete(controllers.destroy);

// seller
router.route("/:id/seller").get(controllers.findSeller);
module.exports = router;
