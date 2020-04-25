const _ = require('koa-route');
const Koa = require('koa');
const weeklyForecastHandler = require('./routes/weeklyForecast').weeklyForecastHandler;

const app = new Koa();
const API_V1_PREFIX = '/api/v1'

app.use(_.get(`${API_V1_PREFIX}/weekly-forecast`, weeklyForecastHandler));
app.listen(3000);
