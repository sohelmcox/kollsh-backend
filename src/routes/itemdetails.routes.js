const router = require("express").Router();
const itemDetailsController = require("../api/v1/itemDetails/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(itemDetailsController.find)
  .post(authenticate, itemDetailsController.create);
router
  .route("/:id")
  .get(itemDetailsController.findSingle)
  .put(authenticate, itemDetailsController.updateOrCreate)
  .patch(authenticate, itemDetailsController.edit)
  .delete(authenticate, itemDetailsController.destroy);
router
  .route("/:id/comments")
  .get(authenticate, itemDetailsController.findComment)
  .post(authenticate, itemDetailsController.createComment);

module.exports = router;
