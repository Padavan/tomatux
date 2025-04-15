import React, { useState, useMemo } from 'react';

const monthMapping = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
}

/** @typedef {'#EBEDF0' | '#639974' | '#216e39' | '#134222'} HeatColor */

/** @type {Date} */
const today = new Date();

/** @type {Record<string, HeatColor>} */
const colorMapping = {
  default: '#EBEDF0',
  low: '#639974',
  medium: '#216e39',
  high: '#134222',
};
 
// TODO: use maxCount to do proper heatmap;
/***
 * @param {number} count
 * @returns {string}
 **/
const getHeatmapColor = (count) => {
  if (count >= 8) return colorMapping.high;
  if (count < 8 && count >= 3) return colorMapping.medium;
  if (count > 0 && count < 3) return colorMapping.low;
  return colorMapping.default;
}

/** @returns {string[]} */
const constructYearData = () => {
  const data = [];

  for (let i = 0; i < 366; i++) {
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i + 1);
    data.push(currentDate.toISOString().slice(0, 10));
  };

  return data;
};

/** @param {string} isoString */
const getDayOfWeek = (isoString) => {
  const d = new Date(isoString);
  return d.getDay();
}

/***
 * @param {Record<string, number>} stats
 * @param {string} date
 * @returns {number}
 **/
function getCount(stats, date) {
  return stats[date] ?? 0;
}

/***
 * @param {string[]} days
 * @returns string[]
 **/
function constructMonthData(days) {
  const arr = days.filter((value, index) => index % 7 == 0).map(s => s.slice(5,7));
  let current = '';
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== current) {
      filteredArr.push(arr[i]);
    } else {
      filteredArr.push('');
    }
    current = arr[i];
  }

  return filteredArr;
}


/** @param {number} dataStartWithDay */
function getEmptyDays(dataStartWithDay) {
  if (dataStartWithDay == 0) return []
  return Array.from(Array(7 - dataStartWithDay).keys())
}

/** @param {{ stats: Record<string, number> }} props */ 
const Heatmap = (props) => {
  const dataList = useMemo(() => constructYearData(), []);
  const monthData = useMemo(() => constructMonthData(dataList), [dataList]);
  const dayOfWeek = useMemo(() => getDayOfWeek(dataList[0]), [dataList]);

  const [hightlightedMonth, setHightlightedMonth] = useState('');

  /** @param {string} month */
  const handleHighlighMonth = (month) => {
    setHightlightedMonth(old => {
      if (old === month) {
        return '';
      } else {
        return month;
      }
    })
  }

  return (
    <div className='heatmap'>
      <div className="month-col">
        {monthData.map((mon, i) => (
          <button
            className={`month ${mon && mon === hightlightedMonth ? "hightlightedMonth" : ""} `}
            onClick={() => {if (mon) handleHighlighMonth(mon)}}
            key={i}
          >
            {monthMapping[mon]}
          </button>
        ))}
      </div>
      <div className="grid">
        {getEmptyDays(dayOfWeek).map(cell => <span key={cell} className="cell invisibleCell" />)}
        {dataList.map(date => {
          const count = getCount(props.stats, date);
          const month = date.slice(5,7);
          return (
            <span
              key={date}
              className={`cell month-${month} ${month == hightlightedMonth ? "hightlightedCell" : ""}`}
              title={`Finished ${count} on ${date}`}
              style={{ backgroundColor: getHeatmapColor(count) }}
            />
          )}
        )}
      </div>
    </div>
  );
}

export { Heatmap };
