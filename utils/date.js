const addDate = (date) => {
    let dString = date.toString();
    
    const lChar = dString.charAt(dString.length - 1);
    if (lChar === '1' && dString !== '11') {
      dString = `${dString}st`;
    } else if (lChar === '2' && dString !== '12') {
      dString = `${dString}nd`;
    } else if (lChar === '3' && dString !== '13') {
      dString = `${dString}rd`;
    } else {
      dString = `${dString}th`;
    }
    return dString;
  };
  
  
  module.exports = (
    timestamp,
    { monLen = 'short', dSuff = true } = {}
  ) => {
    let months;
    if (monLen === 'short') {
      months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      };
    } else {
      months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      };
    }
  
    const dObject = new Date(timestamp);
    const month = months[dObject.getMonth()];
  
    let dayOfMonth;
  
    if (dSuff) {
      dayOfMonth = addDate(dObject.getDate());
    } else {
      dayOfMonth = dObject.getDate();
    }
  
    const year = dObject.getFullYear();
  
    let hour;
    
    if (dObject.getHours > 12) {
      hour = Math.floor(dObject.getHours() / 2);
    } else {
      hour = dObject.getHours();
    }
    
    if (hour === 0) {
      hour = 12;
    }
  
    const min = dObject.getMinutes();
   
    let timeOfDay;
    if (dObject.getHours() >= 12) {
      timeOfDay = 'pm';
    } else {
      timeOfDay = 'am';
    }
  
    const timeStamp = `${month} ${dayOfMonth}, ${year} at ${hour}:${min} ${timeOfDay}`;
  
    return timeStamp;
  };