const { MemberSchema } = require("../models/member.model");

const updateMember = async (id, member) => {
  return await MemberSchema.update(id, member);
};

module.exports = updateMember;
