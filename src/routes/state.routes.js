const router = require("express").Router();
const stateController = require("../api/v1/state/controllers");
const authenticate = require("../middleware/authenticate");
const { hasPermission } = require("../middleware/hasPermission");

router
  .route("/")
  .get(stateController.find)
  .post(authenticate, hasPermission("state", ["write"]), stateController.create)
  .delete(
    authenticate,
    hasPermission("state", ["delete"]),
    stateController.destroyMany,
  );
router
  .route("/:id")
  .get(stateController.findSingle)
  .put(
    authenticate,
    hasPermission("state", ["update"]),
    stateController.updateOrCreate,
  )
  .patch(authenticate, hasPermission("state", ["update"]), stateController.edit)
  .delete(
    authenticate,
    hasPermission("state", ["delete"]),
    stateController.destroy,
  );

module.exports = router;
