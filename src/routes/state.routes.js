const router = require("express").Router();
const stateController = require("../api/v1/state/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(stateController.find)
  .post(stateController.create)
  .delete(stateController.destroyMany);
router
  .route("/:id")
  .get(stateController.findSingle)
  .put(stateController.updateOrCreate)
  .patch(stateController.edit)
  .delete(stateController.destroy);

module.exports = router;
