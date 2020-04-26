import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AxisTick } from './utils';

export const BarChart = ({ data, title, dataKey='value', legend=true, fill='#8884d8' }) => {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ReBarChart
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
        {legend && <Legend verticalAlign="bottom"/>}
        <Tooltip />
        <Bar type="monotone" dataKey={dataKey} fill={fill}/>
      </ReBarChart>
    </div>
  );
};
