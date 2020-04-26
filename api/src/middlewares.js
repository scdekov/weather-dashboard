const session = require('./services/session');
const auth = require('./services/auth');

const authenticateUserMiddleware = async (ctx, next) => {
  const sessionId = ctx.cookies.get('sessionid');
  if (!sessionId) {
    ctx.user = null;
  } else {
    const userSession = session.getSession(sessionId);
    ctx.user = userSession ? auth.getUser(userSession.user) : null;
  }
  await next();
};

module.exports = { authenticateUserMiddleware };
