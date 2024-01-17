const { MemberSchema, MemberStorage } = require("../models/member.model");

const getAllMember = async (department) => {
  let members;
  if (department) {
    members = await MemberSchema.queryArrayContains("roles", department);
  } else {
    members = await MemberSchema.getAll();
  }
  for (let i = 0; i < members.length; i++) {
    if (!members[i].imageUrl) {
      continue;
    }
    members[i].imageUrl = await MemberStorage.download(members[i].imageUrl);
  }
  return members;
};

module.exports = getAllMember;
