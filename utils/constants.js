const APP_DOMAIN = "https://6477j4-3000.csb.app";
const DOC_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GDSC Portfolio Service</title>
  </head>
  <body>
    <img src="https://seeklogo.com/images/G/google-developers-logo-F8BF3155AC-seeklogo.com.png" alt="logo" width="100">
    <h1>GDSC Portfolio Back-end Service</h1>
    <span>Served URL: </span>
    <a href="${APP_DOMAIN}">${APP_DOMAIN}</a>
  </body>
</html>
`;

const APP_STRINGS = {
  notFoundMember: (id) => `Member ${id} not found!`,
  createdMember: (id) => `Member ${id} created successfully`,
  deletedMember: (id) => `Member ${id} deleted successfully`,
  updatedMember: (id) => `Member ${id} updated successfully`,
  userNameAvailable: (id) => `Username ${id} is available`,
  userNameNotAvailable: (id) => `Username ${id} is not available`,
  downloadFile: (path) => `File ${path} downloaded successfully`,
  uploadFile: (path) => `File ${path} uploaded successfully`,
  notFoundFile: (path) => `File ${path} not found!`,
  deleteFile: (path) => `File ${path} deleted successfully`,
};

module.exports = {
  APP_DOMAIN,
  DOC_TEMPLATE,
  APP_STRINGS,
};
