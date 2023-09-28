const router = require("express").Router();
const userProfileController = require("../api/v1/userProfile/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(userProfileController.find)
  .post(authenticate, userProfileController.create)
  .delete(authenticate, userProfileController.destroyMany);
router
  .route("/:id")
  .get(userProfileController.findSingle)
  .put(authenticate, userProfileController.updateOrCreate)
  .patch(authenticate, userProfileController.edit)
  .delete(authenticate, userProfileController.destroy);

module.exports = router;
