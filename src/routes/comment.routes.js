const router = require("express").Router();
const commentController = require("../api/v1/comment/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(commentController.find)
  .post(authenticate, commentController.create)
  .delete(authenticate, commentController.destroyMany);
router
  .route("/:id")
  .get(commentController.findSingle)
  .put(authenticate, commentController.updateOrCreate)
  .patch(authenticate, commentController.edit)
  .delete(authenticate, commentController.destroy);

module.exports = router;
