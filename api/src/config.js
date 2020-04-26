module.exports = {
    OWM_API_KEY: process.env.OWM_API_KEY,
    OWM_API_URL: 'https://api.openweathermap.org/data/2.5/onecall',
    SOFIA_LAT_LON: { lat: 42.7157, lon: 23.3844 },
    OWM_UNITS: 'metric',

    PASSWORD_SALT_ROUNDS: 10,

    USERS_FILE_PATH: `${__dirname}/services/usersData-${process.env.NODE_ENV}.json`,
    SESSIONS_FILE_PATH: `${__dirname}/services/sessionsData-${process.env.NODE_ENV}.json`,

    ADMIN_USERNAME: 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
};
