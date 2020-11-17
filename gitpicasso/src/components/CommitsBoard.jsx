import React from 'react'
import yearDays from 'year-days'
import SingleCommit from './SingleCommit'


function getWeekday(year) {
    //get the day of 31 dec of the year
    const date = `${year}-12-31`
    const dayOfWeek = new Date(date).getDay(); 
    // return isNaN(dayOfWeek) ? null : 
    // ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOfWeek];
    return isNaN(dayOfWeek) ? null : (dayOfWeek+1)%7;
}

function getDayOfMonth(month, year) {
    const isLeap = yearDays(parseInt(year)) === 366 ? true : false
    const months = [
        31, //jan
        isLeap ? 29 : 28, //feb
        31, //mar
        30, //apr
        31, //may
        30, //jun
        31, //jul
        31, //aug
        30, //sep
        31, //oct
        30, //nov
        31, //dec
    ]
    
    return (month>=0 && month<=12) ?  months[month-1] : null;
}

function CommitsBoard(props) {
    const {handleClick, commits, allowDrawOnMouseOver} = props;
    let {year} = props;
    year = (year === undefined || year===null) ? 0 : year;
    const remainingDays = getWeekday(year) //returns days remaining to render for commitsboard
    const cellsCount = 52 * 7 + remainingDays
    const daysOfYear = yearDays(parseInt(year));
    let offset = cellsCount - daysOfYear;

    const commitsArray = []
    let currentDay = 1;
    let currentMonth = 1;
    let currentMonthDays = getDayOfMonth(currentMonth, year);
    //render all cells
    for(let i=0; i<53; i++) {
        const insideAr = []
        for(let j=0; j<7; j++) {
            if(currentMonth >12) {
                break;
            }
            if (offset >= 0) {
                //render a dummy single commit with no props
                insideAr.push(<SingleCommit commits={commits} id={i+j} className = "commit"/>)
                offset --;
            } else {
                const id = `${year}-${currentMonth<10 ? '0'+currentMonth : currentMonth}-${currentDay<10 ? '0'+currentDay : currentDay}`
                insideAr.push(<SingleCommit
                                    className = "commit" 
                                    id = {id}
                                    year={year} 
                                    handleClick={handleClick} 
                                    commits={commits} 
                                    allowDrawOnMouseOver={allowDrawOnMouseOver} />)
                currentDay++;
                if(currentDay > currentMonthDays) {
                    currentDay = 1;
                    currentMonth++;
                    currentMonthDays = getDayOfMonth(currentMonth, year);
                }
            }
        }

        commitsArray.push(<div className='cols'>{insideAr}</div>)
    }

    return commitsArray
  }

export default CommitsBoard