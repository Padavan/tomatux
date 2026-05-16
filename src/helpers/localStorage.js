/** @typedef {import('../types').PomodoroSettings} PomodoroSettings */

const SETTINGS_KEY = "tomatux_settings";
const STATS_KEY = "tomatux_statistics";

/***
 * @returns {PomodoroSettings | null}
 **/
export function loadSettings() {
  try {
    const serializedState = localStorage.getItem(SETTINGS_KEY);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not read settings", error);
    return null;
  }
}

/***
 * @param {PomodoroSettings} state
 * @returns {boolean}
 **/
export function saveSettings(state) {
  let status = false;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(SETTINGS_KEY, serializedState);
    status = true;
  } catch (error) {
    // Ignore errors
    console.error("Error while saving settings: ", error);
    status = false;
  }
  return status;
}

/** @param {string} dayString */
export function updateStats(dayString) {
  try {
    // let data = {};
    const statsJson = localStorage.getItem(STATS_KEY);
    if (statsJson) {
      const oldStats = JSON.parse(statsJson);
      if (typeof oldStats === "object") {
        oldStats[dayString] = (oldStats[dayString] ?? 0) + 1;
        localStorage.setItem(STATS_KEY, JSON.stringify(oldStats));
      } else {
        localStorage.setItem(STATS_KEY, JSON.stringify({ [dayString]: 1 }));
      }
    } else {
      localStorage.setItem(STATS_KEY, JSON.stringify({ [dayString]: 1 }));
    }
  } catch (error) {
    console.error("Error while updateing stats:", error);
  }
}

/** @returns {Record<string, number>} */
export function getStats() {
  /** @type {Record<string, number>} */
  let stats = {};
  try {
    const statsJson = localStorage.getItem(STATS_KEY);
    if (statsJson) {
      stats = JSON.parse(statsJson);
    }
  } catch (error) {
    console.error("Error on obtaining stats:", error);
  }

  return stats;
}
