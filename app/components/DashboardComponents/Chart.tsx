"use client";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 4567, amt: 2400 },
  { name: "Page C", uv: 200, pv: 1398, amt: 2400 },
  { name: "Page D", uv: 278, pv: 3908, amt: 2400 },
  { name: "Page E", uv: 189, pv: 4800, amt: 2400 },
];

interface RenderCustomAxisTickProps {
  x: number;
  y: number;
  payload: { value: string };
}
const RenderCustomAxisTick: React.FC<RenderCustomAxisTickProps> = ({
  x,
  y,
  payload,
}) => {
  return (
    <p style={{ position: 'absolute', top: y, left: x, fill: '#666', textAlign: 'center' }}>
      {payload.value}
    </p>
  );
};

const RenderLineChart: React.FC = () => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis
        dataKey="name"
        tick={(props) => <RenderCustomAxisTick {...props} />}
      />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export { RenderLineChart, RenderCustomAxisTick };
