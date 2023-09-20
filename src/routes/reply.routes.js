const router = require("express").Router();
const replyController = require("../api/v1/reply/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(replyController.find)
  .post(authenticate, replyController.create)
  .delete(authenticate, replyController.destroyMany);
router
  .route("/:id")
  .get(replyController.findSingle)
  .patch(authenticate, replyController.edit)
  .delete(authenticate, replyController.destroy);

module.exports = router;
