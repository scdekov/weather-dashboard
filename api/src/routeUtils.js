const requireAuthnetication = handler => {
  const inner = (ctx, ...args) => {
    if (ctx.user === null) {
      ctx.throw(401);
    }
    return handler(ctx, ...args);
  };
  return inner;
};

const requireAdmin = handler => {
  const authenticated = requireAuthnetication(handler);
  const inner = (ctx, ...args) => {
    if (!ctx.user.isAdmin) {
      ctx.throw(403);
    }
    return authenticated(ctx, ...args);
  };
  return inner;
}

module.exports = { requireAuthnetication, requireAdmin };
