"use client";

import React from 'react';
import { RenderCustomAxisTick, RenderLineChart } from './Chart';

const ChartPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Line Chart with Custom Axis Ticks</h2>
      
      {/* Line Chart Component */}
      <div className="flex justify-center">
        <RenderLineChart />
      </div>

      {/* Custom Axis Tick Example */}
      <h3 className="text-lg font-semibold text-center mt-6">Custom Axis Tick Example</h3>
      <div className="flex justify-center">
        <RenderCustomAxisTick x={100} y={100} payload={{ value: 'Page A' }} />
        <RenderCustomAxisTick x={130} y={100} payload={{ value: 'Page B' }} />
        <RenderCustomAxisTick x={160} y={100} payload={{ value: 'Page C' }} />
        <RenderCustomAxisTick x={190} y={100} payload={{ value: 'Page D' }} />
        <RenderCustomAxisTick x={220} y={100} payload={{ value: 'Page E' }} />
      </div>
    </div>
  );
};

export default ChartPage;
