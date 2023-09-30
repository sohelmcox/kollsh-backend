const router = require("express").Router();
const replyController = require("../api/v1/reply/controllers");
const authenticate = require("../middleware/authenticate");
const hasOwnership = require("../middleware/hasOwnership");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(replyController.find)
  .post(authenticate, hasPermission("reply", ["write"]), replyController.create)
  .delete(
    authenticate,
    hasPermission("reply", ["delete"]),
    // hasOwnership("Reply", "user"),
    replyController.destroyMany,
  );
router
  .route("/:id")
  .get(replyController.findSingle)
  .patch(
    authenticate,
    hasPermission("reply", ["update"]),
    hasOwnership("Reply", "user"),
    replyController.edit,
  )
  .delete(
    authenticate,
    hasPermission("reply", ["delete"]),
    hasOwnership("Reply", "user"),
    replyController.destroy,
  );

module.exports = router;
