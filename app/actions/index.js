// export const startTimer = () => ({
//   type: 'START_TIMER'
// });
// ​
// export const stopTimer = () => ({
//   type: 'STOP_TIMER'
// });
// ​

export default function(state = null, action) {
  switch (action.type) {
    case 'CONTACT_SELECTED':
      return action.payload
  }
  return state;
}
