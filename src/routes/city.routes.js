const router = require("express").Router();
const cityController = require("../api/v1/city/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(cityController.find)
  .post(authenticate, cityController.create)
  .delete(authenticate, cityController.destroyMany);
router
  .route("/:id")
  .get(cityController.findSingle)
  .put(authenticate, cityController.updateOrCreate)
  .patch(authenticate, cityController.edit)
  .delete(authenticate, cityController.destroy);

module.exports = router;
