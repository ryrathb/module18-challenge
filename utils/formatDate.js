const addSuffix = date => {
    let strDate = date.toString();
    const finalChar = strDate.charAt(strDate.length - 1);
    if (finalChar === '1' && strDate !== '11') {
        strDate = `${strDate}st`;
    }
    else if (finalChar === '2' && strDate !== '12') {
        strDate = `${strDate}nd`;
    }
    else if(finalChar === '3' && strDate !== '13') {
        strDate = `${strDate}rd`;
    }
    else {
        strDate = `${strDate}th`;
    }
    return strDate;
}

module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true} = {}
) => {
    let months;
    if (monthLength === 'short') {
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
    }
    else {
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

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    let dayMonth;

    if (dateSuffix) {
        dayMonth = addSuffix(dateObj.getDate());
    }
    else {
        dayMonth = dateObj.getDate();
    }

    const year = dateObj.getFullYear();
    let hour;

    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    }
    else {
        hour = dateObj.getHours();
    }

    if (hour === 0) {
        hour = 12;
    }

    const minutes = dateObj.getMinutes;
    let periodDay;

    if (dateObj.getHours() >= 12) {
        periodDay = 'pm';
    }
    else {
        periodDay = 'am';
    }

    const formatTS = `${formattedMonth} ${dayMonth}, ${year} at ${hour}:${minutes} ${periodDay}`;
    return formatTS;
}
