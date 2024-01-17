const { MemberSchema } = require("../models/member.model");

const deleteMember = async (id) => {
  await MemberSchema.delete(id);
};

module.exports = deleteMember;
