const auth = require('../services/auth');
const session = require('../services/session');

const isValidUserData = userData => {
  return userData.username && userData.password;
}

const registerHandler = async ctx => {
  const userData = ctx.request.body;
  if (!isValidUserData(userData)) {
    // TOOD: extract this in validator and use ctx.throw
    ctx.response.status = 400;
    ctx.response.body = { detail: 'Bad data' };
    return;
  }

  if (auth.userExists(userData)) {
    ctx.response.status = 400;
    ctx.response.body = { detail: 'User with this username already exists' };
    return;
  }

  await auth.addUser(userData);
  ctx.status = 200;
};

const loginHandler = async ctx => {
  const userData = ctx.request.body;

  if (!isValidUserData(userData)) {
    ctx.response.status = 400;
    ctx.response.body = { detail: 'Bad data' };
    return;
  }

  const user = await auth.authenticateUser(userData);
  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = { detail: 'User not found' };
    return;
  }

  const sessionid = session.createSession({ user: userData.username });
  ctx.cookies.set('sessionid', sessionid, { signed: true });
  ctx.response.status = 200;
  ctx.body = { isAdmin: user.isAdmin || false };
};

const logoutHandler = async ctx => {
  const sessionid = ctx.cookies.get('sessionid');
  if (sessionid) {
    session.deleteSession(sessionid);
  }
  ctx.response.status = 200;
};

module.exports = { registerHandler, loginHandler, logoutHandler };
