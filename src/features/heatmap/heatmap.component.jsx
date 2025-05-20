import React, { useState, useMemo } from 'react';
import './heatmap.styles.css';

/** @type {Record<string, string>} */
var monthMapping = {
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

/** @type {Date} */
const today = new Date();

// TODO: use maxCount to do proper heatmap;
/***
 * @param {number} count
 * @returns {string}
 **/
const getHeatmapColor = (count) => {
  if (count >= 8) return '#134222';
  if (count < 8 && count >= 3) return '#216e39';
  if (count > 0 && count < 3) return '#639974';
  return 'transparent';
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
  console.log("days", days);
  /** @type {string[]} */
  var arr = [];
  days.forEach((s, index) => {
    if (index % 7 === 0) {
      arr.push(s.slice(5,7));
    }
  });
  console.log("arr", arr);
  let current = '';
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== current) {
      filteredArr.push(arr[i] ?? '');
    } else {
      filteredArr.push('');
    }
    current = arr[i] ?? '';
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
  const dayOfWeek = useMemo(() => getDayOfWeek(dataList[0] ?? ''), [dataList]);

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

  console.log("hightlightedMonth", hightlightedMonth);

  return (
    <div className='Heatmap'>
      <div className="Heatmap_monthcol">
        {monthData.map((mon, i) => (
          <button
            key={i}
            className={`Heatmap_month ${mon && mon === hightlightedMonth ? "Heatmap_hightlightedMonth" : ""} `}
            onClick={() => {if (mon) handleHighlighMonth(mon)}}
          >
            {monthMapping[mon]}
          </button>
        ))}
      </div>
      <div className="Heatmap_grid">
        {getEmptyDays(dayOfWeek).map(cell => <span key={cell} className="Heatmap_cell Heatmap_invisibleCell" />)}
        {dataList.map(date => {
          const count = getCount(props.stats, date);
          const month = date.slice(5,7);
          return (
            <span
              key={date}
              className={`Heatmap_cell month-${month} ${month == hightlightedMonth ? "Heatmap_hightlightedCell" : ""}`}
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
