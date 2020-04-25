const _ = require('koa-route');
const Koa = require('koa');
const weeklyForecastHandler = require('./routes/weeklyForecast').weeklyForecastHandler;
const authHandlers = require('./routes/auth');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require('./services/session');
const auth = require('./services/auth');

const app = new Koa();
const API_V1_PREFIX = '/api/v1'

app.keys = [process.env.APP_SECRET];

app.use(bodyParser());
app.use(logger());

// TODO: verify handling of unknown paths
app.use(_.get(`${API_V1_PREFIX}/weekly-forecast`, weeklyForecastHandler));

app.use(_.post(`${API_V1_PREFIX}/login`, authHandlers.loginHandler));
app.use(_.post(`${API_V1_PREFIX}/register`, authHandlers.registerHandler));

session.ensureSessionsFile();
auth.ensureUsersFile();

const port = (process.env.NODE_ENV !== 'test') ? 3000 : 3001
const server = app.listen(port);
module.exports = server;
