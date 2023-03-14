const router = require("express").Router();

// De-structuring the exported object 
const {
  getUser,
  Getsingleuser,
  Create,
  Edituser,
  Removeuser,
  Createfrind,
  Removefriend,
} = require("../../controllers/userController");

router.route("/").get(getUser).post(Create);


router.route("/:userId").get(Getsingleuser).put(Edituser).delete(Removeuser);

router
  .route("/:userId/friends/:friendId")
  .post(Createfrind)
  .delete(Removefriend);

module.exports = router;
