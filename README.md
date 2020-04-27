# Weather Dashboard

Simple weather data dashboard using [Open Weather API](https://openweathermap.org/).

---
## Requirements
* git
* node 12
* npm 6.14
* docker 19 (If you're going to run mongodb locally)
* [Open Weather API Key](https://openweathermap.org/). In order to get this, you need to sign up, then go to https://home.openweathermap.org/api_keys and you'll see the generated API key.

## Setup MongoDB
```
docker pull mongo:4.0.4
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4
```

## Setup API and Front-end
```
git clone git@github.com:scdekov/weather-dashboard.git
cd weather-dashboard
npm install
```

## Create .env file
```
# from the project root
cp .env.sample .env
sed -i 's/<your-owm-api-key>/apikey/g' .env
```
In this file you can configure variables used in the app:
* ADMIN_PASSWORD - "admin" is the default
* APP_SECRET - used for signing cookies, "dev" is the default
* NODE_ENV - "dev" is default
* FRONT_END_ORIGIN - "http://localhost:8080" is the default
* MONGO_HOST - "localhost" is the default
* MONGO_PORT - "27017" is the default

## Run the tests
```
npm run test
```

## Start API and Front-end on localhost
```
npm run apidev
```
```
npm run app
```
or with a single command
```
npm run apidev & npm run app
```
