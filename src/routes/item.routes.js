const router = require("express").Router();
const { controllers } = require("../api/v1/item");

router.route("/").get(controllers.find).post(controllers.create);
router.route("/:id").get(controllers.findSingle);
module.exports = router;
