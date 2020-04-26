const middlewares = require('../src/middlewares');

const shapeFlags = flags =>
  flags.reduce((shapedFlags, flag) => {
    const [flagName, rawValue] = flag.split("=");
    const value = rawValue ? rawValue.replace(";", "") : true;
    return { ...shapedFlags, [flagName]: value };
  }, {});

const extractCookies = headers => {
  const cookies = headers["set-cookie"]; // Cookie[]

  return cookies.reduce((shapedCookies, cookieString) => {
    const [rawCookie, ...flags] = cookieString.split("; ");
    const [cookieName, value] = rawCookie.split("=");
    return { ...shapedCookies, [cookieName]: { value, flags: shapeFlags(flags) } };
  }, {});
};

// note: this require middleares module to be mocked. should this mocking be happening here?
const authenticateUser = (username='svetlio', isAdmin=false) => {
  middlewares.authenticateUserMiddleware.mockImplementationOnce(async (ctx, next) => {
    ctx.user = username ? { username, isAdmin } : null;
    await next();
  });
};

module.exports = { extractCookies, authenticateUser };
