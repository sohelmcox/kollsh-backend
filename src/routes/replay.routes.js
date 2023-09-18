const router = require("express").Router();
const replayController = require("../api/v1/replay/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(replayController.find)
  .post(authenticate, replayController.create)
  .delete(authenticate, replayController.destroyMany);
router
  .route("/:id")
  .get(replayController.findSingle)
  .patch(authenticate, replayController.edit)
  .delete(authenticate, replayController.destroy);

module.exports = router;
