import React, { useState } from 'react';
import axios from 'axios';
import { Container, Dimmer, Loader, Divider, Grid } from 'semantic-ui-react';
import * as moment from 'moment'
import { API_URL } from '../config';
import { TemperatureChart } from './charts/Temperature';
import { BarChart } from './charts/Bar';
import { GeneralWeatherChart } from './charts/GeneralWeather';

const prepareChartsData = data => {
  return {
    temperature: data.map(d => {
      return {
        date: moment.unix(d.dt).format('MMMM Do'),
        max: d.temp.max.toFixed(1),
        min: d.temp.min.toFixed(1)
      };
    }),
    windSpeed: data.map(d => {
      return {
        date: moment.unix(d.dt).format('MMMM Do'),
        value: d.wind_speed
      };
    }),
    rain: data.map(d => {
      return {
        date: moment.unix(d.dt).format('MMMM Do'),
        value: d.rain || 0
      };
    }),
    general: data.map(d => {
      return {
        date: moment.unix(d.dt).format('MMMM Do'),
        data: d.weather[0]
      };
    })
  };
};

export const Dashboard = ({ onUnauthenticated }) => {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${API_URL}/weekly-forecast`);
        setWeatherData(prepareChartsData(resp.data));
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          onUnauthenticated();
        } else {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      {!loading && (
        <Container>
          <Divider section horizontal>
            Weather Forecast for Sofia, Bulgaria
          </Divider>
          <Grid celled>
            <Grid.Row>
              <Grid.Column tablet={16} computer={8}>
                <GeneralWeatherChart data={weatherData.general}/>
              </Grid.Column>
              <Grid.Column tablet={16} computer={8}>
                <TemperatureChart data={weatherData.temperature}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column tablet={16} computer={8}>
                <BarChart
                  title="Rain(mm)"
                  data={weatherData.rain}
                  legend={false}
                  fill="#80D4F7"/>
              </Grid.Column>
              <Grid.Column tablet={16} computer={8}>
                <BarChart
                  title="Wind Speed(meter/sec)"
                  data={weatherData.windSpeed}
                  fill="#A2A2A2"
                  legend={false}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )}}
    </div>);
};
