const auth = require('../services/auth');
const session = require('../services/session');

const isValidUserData = userData => {
  return userData.username && userData.password;
}

const registerHandler = async ctx => {
  const userData = ctx.request.body;
  if (!isValidUserData(userData)) {
    ctx.response.status = 400;
    ctx.response.body = { 'detail': 'Bad data' };
    return;
  }

  if (auth.userExists(userData)) {
    ctx.response.status = 400;
    ctx.response.body = { 'detail': 'User already exists' };
    return;
  }

  auth.addUser(userData);
  ctx.status = 201;
};

const loginHandler = async (ctx, next) => {
  const userData = ctx.request.body;

  if (!isValidUserData(userData)) {
    ctx.response.status = 400;
    ctx.response.body = { 'detail': 'Bad data' };
    return;
  }

  if (!auth.userExists(userData)) {
    console.log('not exists')
    ctx.response.status = 401;
    ctx.response.body = { detail: 'User not found' };
    return;
  }

  const sessionid = session.createSession({ user: userData.username });
  ctx.cookies.set('sessionid', sessionid, { signed: true });

  ctx.response.status = 200;
};

module.exports = { registerHandler, loginHandler };
