const router = require("express").Router();
const stateController = require("../api/v1/state/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(stateController.find)
  .post(authenticate, stateController.create)
  .delete(authenticate, stateController.destroyMany);
router
  .route("/:id")
  .get(stateController.findSingle)
  .put(authenticate, stateController.updateOrCreate)
  .patch(authenticate, stateController.edit)
  .delete(authenticate, stateController.destroy);

module.exports = router;
