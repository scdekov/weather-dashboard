const fs = require('fs');
const config = require('../config');
const auth = require('../services/auth');

const getUsersHandler = async ctx => {
  let users = JSON.parse(fs.readFileSync(config.USERS_FILE_PATH));
  ctx.response.body = Object.keys(users).map(username => ({
    username,
    isAdmin: users[username].isAdmin || false
  }));
  ctx.response.status = 200;
};

const deleteUserHandler = async ctx => {
  const username = ctx.request.body.username;
  if (!username) {
    ctx.response.status = 400;
    ctx.body = { detail: 'Bad data' };
    return;
  }

  const user = auth.getUser(username);
  if (user.isAdmin) {
    ctx.response.status = 400;
    ctx.body = { detail: 'Can not delete admin' };
    return;
  }

  auth.deleteUser(username);
  ctx.response.status = 200;
};

module.exports = { getUsersHandler, deleteUserHandler };
