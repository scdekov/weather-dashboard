import React from 'react';
import '../../css/GeneralWeatherChart.css';
import * as icons from '../../icons/index';

export const GeneralWeatherChart = ({ data }) => {
  const toTitleCase = str => str[0].toUpperCase() + str.slice(1);

  return (
    <div className="chart-container">
      <h3>General</h3>
      <div className="general-weather-chart">
        {data.map((dayData, ix) => {
          return (
            <div key={`${ix}div`} className="chart-item">
              <label key={`${ix}lb1`}>{dayData.date}</label>
              <img
                key={`${ix}img`}
                src={`${dayData.data.icon}.png`}/>
              <label key={`${ix}lb2`}>{toTitleCase(dayData.data.description)}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
