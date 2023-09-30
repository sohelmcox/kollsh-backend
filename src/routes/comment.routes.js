const router = require("express").Router();
const commentController = require("../api/v1/comment/controllers");
const authenticate = require("../middleware/authenticate");
const hasOwnership = require("../middleware/hasOwnership");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(commentController.find)
  .post(
    authenticate,
    hasPermission("comment", ["delete"]),
    commentController.create,
  )
  .delete(
    authenticate,
    hasPermission("comment", ["delete"]),
    commentController.destroyMany,
  );
router
  .route("/:id")
  .get(commentController.findSingle)
  .put(
    authenticate,
    hasPermission("comment", ["delete"]),
    commentController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("comment", ["delete"]),
    hasOwnership("Comment", "author"),
    commentController.edit,
  )
  .delete(
    authenticate,
    hasPermission("comment", ["delete"]),
    hasOwnership("Comment", "author"),
    commentController.destroy,
  );

module.exports = router;
