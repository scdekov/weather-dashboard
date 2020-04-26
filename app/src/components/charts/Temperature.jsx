import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AxisTick } from './utils';

export const TemperatureChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>Temperature(&#8451;)</h3>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"
               tick={<AxisTick/>}
               minTickGap={-20}/>
        <YAxis/>
        <Tooltip />
        <Legend verticalAlign="top" formatter={value => `${value[0].toUpperCase()}${value.slice(1)}`}/>
        <Line type="monotone" dataKey="max" stroke="#ED254E"/>
        <Line type="monotone" dataKey="min" stroke="#3293D0"/>
      </LineChart>
    </div>
  );
};
