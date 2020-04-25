const axios = require('axios');
const config = require('../config');

const weeklyForecastHandler = async ctx => {
  const url = `${config.OWM_API_URL}?\
lat=${config.SOFIA_LAT_LON.lat}&\
lon=${config.SOFIA_LAT_LON.lon}&\
appid=${config.OWM_API_KEY}`;

  const owmResp = await axios.get(url);
  ctx.body = owmResp.data.daily;
}

module.exports = { weeklyForecastHandler };
