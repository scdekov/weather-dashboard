const _ = require('koa-route');
const Koa = require('koa');
const weeklyForecastHandler = require('./routes/weeklyForecast').weeklyForecastHandler;
const logger = require('koa-logger');

const app = new Koa();
const API_V1_PREFIX = '/api/v1'

app.use(logger());
app.use(_.get(`${API_V1_PREFIX}/weekly-forecast`, weeklyForecastHandler));


const port = (process.env.NODE_ENV !== 'test') ? 3000 : 3001
const server = app.listen(port);
module.exports = server;
