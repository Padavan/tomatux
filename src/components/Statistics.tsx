import * as React from 'react';


const mockStats = new Map();
mockStats.set('2022-01-15', 1);
mockStats.set('2022-01-20', 2);
mockStats.set('2022-01-21', 4);
mockStats.set('2022-01-22', 5);
mockStats.set('2022-04-02', 5);
mockStats.set('2021-12-5', 8);
console.log('mockStats', mockStats);

type HeatColor = '#EBEDF0' | '#639974' | '#216e39' | '#134222'; 
const colorMapping: Record<string, HeatColor> = {
  default: '#EBEDF0',
  low: '#639974',
  medium: '#216e39',
  high: '#134222',
};
 
// TODO: use maxCount to do proper heatmap;
const getHeatmapColor = (count: string):string => {
  if (count >= 8) return colorMapping.high;
  if (count < 8 && count >= 3) return colorMapping.medium;
  if (count > 0 && count < 3) return colorMapping.low;
  return colorMapping.default;
}

const constructYearData = () => {
  const data = [];

  let d = new Date();
  for (let i = 0; i < 366; i++) {

    d.setDate(d.getDate() - 1);
    const isoString = d.toISOString().split('T')[0];

    if (mockStats.has(isoString)) {
      data.push({
        date: isoString,
        count: mockStats.get(isoString),
      });
    } else {
      data.push({ date: isoString, count: 0 });
    }
  };

  return data;
};

const getDayOfWeek = (isoString: string) => {
  const d = new Date(isoString);
  return d.getDay();
}

export const Statistics = () => {
  const dataList = constructYearData().reverse();
  const dayOfWeek = getDayOfWeek(dataList[0].date);

  return (
    <section>
      <div className="grid">
        {Array.from(Array(dayOfWeek).keys()).map(cell => <span key={cell} className="invisibleCell" />)}
        {dataList.map(cell => (
          <span
            key={cell.date}
            className="cell"
            title={`${cell.date} ${cell.count}`}
            style={{ backgroundColor: getHeatmapColor(cell.count) }}
          />
        ))}
      </div>
      <p> Developing in progress </p>
    </section>
  );
}
