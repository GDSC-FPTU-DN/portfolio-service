const { MemberSchema, MemberStorage } = require("../models/member.model");

const getMemberById = async (id, uname, isParseImg = true) => {
  if (!uname) {
    const data = await MemberSchema.getById(id);

    // Image
    let imgUrl;
    if (isParseImg) {
      imgUrl = data?.imageUrl
        ? await MemberStorage.download(data.imageUrl)
        : null;
    } else {
      imgUrl = data?.imageUrl;
    }

    // Return
    if (!data) {
      return null;
    }
    return {
      ...data,
      imageUrl: imgUrl,
    };
  } else {
    const queryResult = await MemberSchema.queryEqual("userName", id);

    // Image
    let imgUrl;
    if (isParseImg) {
      imgUrl = queryResult[0]?.imageUrl
        ? await MemberStorage.download(queryResult[0].imageUrl)
        : null;
    } else {
      imgUrl = queryResult[0]?.imageUrl;
    }

    // Return
    if (queryResult.length === 0) {
      return null;
    }
    return {
      ...queryResult[0],
      imageUrl: imgUrl,
    };
  }
};

module.exports = getMemberById;
