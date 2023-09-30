const router = require("express").Router();
const userProfileController = require("../api/v1/userProfile/controllers");
const authenticate = require("../middleware/authenticate");
const hasOwnership = require("../middleware/hasOwnership");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(
    authenticate,
    hasPermission("userProfile", ["read"]),
    userProfileController.find,
  )
  .post(
    authenticate,
    hasPermission("userProfile", ["write"]),
    userProfileController.create,
  )
  .delete(
    authenticate,
    hasPermission("userProfile", ["delete"]),
    userProfileController.destroyMany,
  );
router
  .route("/:id")
  .get(
    authenticate,
    hasPermission("userProfile", ["read"]),
    userProfileController.findSingle,
  )
  .put(
    authenticate,
    hasPermission("userProfile", ["update"]),
    userProfileController.updateOrCreate,
  )
  .patch(
    authenticate,
    hasPermission("userProfile", ["update"]),
    hasOwnership("UserProfile", "user"),
    userProfileController.edit,
  )
  .delete(
    authenticate,
    hasPermission("userProfile", ["delete"]),
    hasOwnership("UserProfile", "user"),
    userProfileController.destroy,
  );

module.exports = router;
