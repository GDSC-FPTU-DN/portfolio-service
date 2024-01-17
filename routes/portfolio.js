var express = require("express");
const mediaRouter = require("./media");
const getAllMembers = require("../controllers/getAllMembers.controller");
const getMemberById = require("../controllers/getMemberById.controller");
const addNewMember = require("../controllers/addMember.controller");
const updateMember = require("../controllers/updateMember.controller");
const deleteMember = require("../controllers/deleteMember.controller");
const responseObject = require("../utils/response");
const { APP_STRINGS } = require("../utils/constants");

var router = express.Router();

// Get All Member
router.get("/", async function (req, res, next) {
  const members = await getAllMembers(req.query.roles);
  res.status(200).send(responseObject(members));
});

// Get Member By Id
router.get("/:id", async function (req, res, next) {
  // Get isParseImg from query
  let isParseImg = req.query.parseimg ?? true;
  if (isParseImg === "false" || isParseImg === "0") {
    isParseImg = false;
  }
  // Get member by id
  const member = await getMemberById(
    req.params.id,
    req.query.uname,
    isParseImg,
  );
  // If member not found
  if (!member) {
    return res
      .status(404)
      .send(responseObject(null, APP_STRINGS.notFoundMember(req.params.id)));
  }
  res.status(200).send(responseObject(member));
});

// Add new member
router.post("/modify", async function (req, res, next) {
  const member = await addNewMember(req.body);
  return res
    .status(200)
    .send(responseObject(member, APP_STRINGS.createdMember(member.id)));
});

// Update getAllMember
router.put("/modify/:id", async function (req, res, next) {
  const id = req.params.id;
  const data = req.body;
  const member = await updateMember(id, data);
  return res
    .status(200)
    .send(responseObject(member, APP_STRINGS.updatedMember(id)));
});

// Delete member
router.delete("/modify/:id", async function (req, res, next) {
  const id = req.params.id;
  await deleteMember(id);
  return res
    .status(200)
    .send(responseObject(null, APP_STRINGS.deletedMember(id)));
});

// Check UserName is available
router.get("/check/:id", async function (req, res, next) {
  const id = req.params.id;
  const member = await getMemberById(id, true, false);
  if (member) {
    return res
      .status(200)
      .send(responseObject(false, APP_STRINGS.userNameNotAvailable(id)));
  }
  return res
    .status(200)
    .send(responseObject(true, APP_STRINGS.userNameAvailable(id)));
});

// Register media routes
router.use("/media", mediaRouter);

module.exports = router;
