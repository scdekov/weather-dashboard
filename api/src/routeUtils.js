const requireAuthnetication = handler => {
  const inner = (ctx, ...args) => {
    if (ctx.user === null) {
      ctx.throw(401);
    }
    return handler(ctx, ...args);
  };
  return inner;
};

module.exports = { requireAuthnetication };
