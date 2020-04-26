const fs = require('fs');
const config = require('../config');

const getUsersHandler = async ctx => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  ctx.response.body = Object.keys(users);
  ctx.response.status = 200;
};

module.exports = { getUsersHandler };
