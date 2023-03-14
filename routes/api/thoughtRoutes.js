const router = require("express").Router();

const {
  getll,
  Create,
  Getsinglerecord,
  updateThought,
  Removethought,
  CreateR,
  Removereaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getll).post(Create);

router
  .route("/:thoughtId")
  .get(Getsinglerecord)
  .put(updateThought)
  .delete(Removethought);


router.route("/:thoughtId/reactions").post(CreateR);

router.route("/:thoughtId/reactions/:reactionId").delete(Removereaction);

module.exports = router;
