import React from 'react';
import { Heatmap } from '../../features/heatmap';
import { getStats } from '../../helpers/localStorage';

export function StatisticPage() {
  const stats = getStats();

  return (
    <div className='statistics'>
      <Heatmap stats={stats} />
      <h4>Total finished pomodoros: {Object.values(stats).reduce((acc, cur) => acc + cur, 0)}</h4>
    </div>
  );
}
