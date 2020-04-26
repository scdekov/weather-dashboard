const requireAuthnetication = handler => {
  const inner = (ctx, ...args) => {
    console.log('in require auth', ctx.user)
    if (ctx.user === null) {
      ctx.throw(401);
    }
    return handler(ctx, ...args);
  };
  return inner;
};

module.exports = { requireAuthnetication };
