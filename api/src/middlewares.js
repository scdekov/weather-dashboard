const session = require('./services/session');

const authenticateUserMiddleware = async (ctx, next) => {
  const sessionId = ctx.cookies.get('sessionid');
  if (!sessionId) {
    ctx.user = null;
  } else {
    const userSession = session.getSession(sessionId);
    ctx.user = userSession ? userSession.user : null;
  }
  await next();
};

module.exports = { authenticateUserMiddleware };
