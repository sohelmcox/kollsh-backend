const router = require("express").Router();
const itemDetailsController = require("../api/v1/itemDetails/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(itemDetailsController.find)
  .post(
    authenticate,
    hasPermission("itemDetails", ["delete"]),
    itemDetailsController.create,
  );
router
  .route("/:id")
  .get(itemDetailsController.findSingle)
  .put(
    authenticate,
    hasPermission("itemDetails", ["delete"]),
    itemDetailsController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("itemDetails", ["delete"]),
    // hasOwnership("ItemDetails", "seller"),
    itemDetailsController.edit,
  )
  .delete(
    authenticate,
    hasPermission("itemDetails", ["delete"]),
    itemDetailsController.destroy,
  );
router
  .route("/:id/comments")
  .get(itemDetailsController.findComment)
  .post(
    authenticate,
    hasPermission("itemDetails", ["write"]),
    itemDetailsController.createComment,
  );

module.exports = router;
