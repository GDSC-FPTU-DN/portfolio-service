const { MemberSchema } = require("../models/member.model");

const addNewMember = async (member) => {
  const data = {
    ...member,
  };
  return await MemberSchema.create(data);
};

module.exports = addNewMember;
