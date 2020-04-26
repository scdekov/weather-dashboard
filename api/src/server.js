const _ = require('koa-route');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('./services/session');
const weeklyForecastHandler = require('./routes/weeklyForecast').weeklyForecastHandler;
const authHandlers = require('./routes/auth');
const getUsersHandler = require('./routes/users').getUsersHandler;
const auth = require('./services/auth');
const requireAuthnetication = require('./routeUtils').requireAuthnetication;
const requireAdmin = require('./routeUtils').requireAdmin;
const authenticateUserMiddleware = require('./middlewares').authenticateUserMiddleware;

const app = new Koa();
const API_V1_PREFIX = '/api/v1'
const FRONT_END_ORIGIN = 'http://localhost:8080';

app.keys = [process.env.APP_SECRET];

app.use(cors({ origin: () => FRONT_END_ORIGIN, credentials: true }));
app.use(bodyParser());
app.use(logger());
app.use(authenticateUserMiddleware);

// TODO: verify handling of unknown paths
app.use(_.get(`${API_V1_PREFIX}/weekly-forecast`, requireAuthnetication(weeklyForecastHandler)));
app.use(_.get(`${API_V1_PREFIX}/get-users`, requireAdmin(getUsersHandler)));

app.use(_.post(`${API_V1_PREFIX}/login`, authHandlers.loginHandler));
app.use(_.post(`${API_V1_PREFIX}/register`, authHandlers.registerHandler));
app.use(_.post(`${API_V1_PREFIX}/logout`, requireAuthnetication(authHandlers.logoutHandler)));

session.ensureSessionsFile();
auth.ensureUsersFile();

const port = (process.env.NODE_ENV !== 'test') ? 3000 : 3002
const server = app.listen(port);
module.exports = server;
