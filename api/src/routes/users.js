const auth = require('../services/auth');
const User = require('../models/User').User;

const getUsersHandler = async ctx => {
  ctx.response.body = await User.find({}, 'username isAdmin');
  ctx.response.status = 200;
};

const deleteUserHandler = async ctx => {
  const username = ctx.request.body.username;
  if (!username) {
    ctx.response.status = 400;
    ctx.body = { detail: 'Bad data' };
    return;
  }

  const user = await auth.getUser(username);
  if (user.isAdmin) {
    ctx.response.status = 400;
    ctx.body = { detail: 'Can not delete admin' };
    return;
  }

  await auth.deleteUser(username);
  ctx.response.status = 200;
};

module.exports = { getUsersHandler, deleteUserHandler };
