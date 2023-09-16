const router = require("express").Router();
const cityController = require("../api/v1/brand/controllers");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(cityController.find)
  .post(cityController.create)
  .delete(cityController.destroyMany);
router
  .route("/:id")
  .get(cityController.findSingle)
  .put(cityController.updateOrCreate)
  .patch(cityController.edit)
  .delete(cityController.destroy);

module.exports = router;
