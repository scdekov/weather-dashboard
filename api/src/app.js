const _ = require('koa-route');
const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const weeklyForecastHandler = require('./routes/weeklyForecast').weeklyForecastHandler;
const authHandlers = require('./routes/auth');
const usersHandlers = require('./routes/users');
const auth = require('./services/auth');
const requireAuthnetication = require('./routeUtils').requireAuthnetication;
const requireAdmin = require('./routeUtils').requireAdmin;
const authenticateUserMiddleware = require('./middlewares').authenticateUserMiddleware;

const app = new Koa();
const API_V1_PREFIX = '/api/v1'
const FRONT_END_ORIGIN = 'http://localhost:8080';

app.keys = [process.env.APP_SECRET];

mongoose
  .connect(`mongodb://localhost:27017/weatherdb-${process.env.NODE_ENV}`,
           { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('db connected'))

app.use(cors({ origin: () => FRONT_END_ORIGIN, credentials: true }));
app.use(bodyParser());
app.use(logger());
app.use(authenticateUserMiddleware);

app.use(_.get(`${API_V1_PREFIX}/weekly-forecast`, requireAuthnetication(weeklyForecastHandler)));

app.use(_.get(`${API_V1_PREFIX}/get-users`, requireAdmin(usersHandlers.getUsersHandler)));
app.use(_.post(`${API_V1_PREFIX}/delete-user`, requireAdmin(usersHandlers.deleteUserHandler)));

app.use(_.post(`${API_V1_PREFIX}/login`, authHandlers.loginHandler));
app.use(_.post(`${API_V1_PREFIX}/register`, authHandlers.registerHandler));
app.use(_.post(`${API_V1_PREFIX}/logout`, requireAuthnetication(authHandlers.logoutHandler)));

auth.ensureAdminUser();
module.exports = app;
