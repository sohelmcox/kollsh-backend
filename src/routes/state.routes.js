const router = require("express").Router();

const { create, find, findSingle } = require("../api/v1/state/controllers");

router.route("/").get(find).post(create);
router.route("/:id").get(findSingle);

module.exports = router;
