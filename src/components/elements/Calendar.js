import React, { useEffect, useState } from 'react'
import moment from 'moment';
import ChevronIcon from '../../components/elements/icons/ChevronIcon';

const Calendar = () => {
  const [navDate, setNavDate] = useState(moment(new Date()));
  const [weekDaysHeaderArr, setWeekDaysHeaderArr] = useState([]);
  const [gridArr, setGridArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    moment.locale('en');
    makeHeader();
    makeGrid();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeHeader = () => {
    const weekDaysArr = [0, 1, 2, 3, 4, 5, 6];
    const headers = weekDaysArr.map((day) => moment().weekday(day).format('ddd'));
    setWeekDaysHeaderArr(headers);
  };

  const makeGrid = () => {
    const newGridArr = [];

    const firstDayDate = moment(navDate).startOf('month');
    const initialEmptyCells = firstDayDate.weekday();
    const lastDayDate = moment(navDate).endOf('month');
    const lastEmptyCells = 6 - lastDayDate.weekday();
    const daysInMonth = navDate.daysInMonth();
    const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

    for (let i = 0; i < arrayLength; i++) {
      let obj = {};
      if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth - 1) {
        obj.value = 0;
        obj.available = false;
      } else {
        obj.value = i - initialEmptyCells + 1;
        obj.available = isAvailable(i - initialEmptyCells + 1);
      }
      newGridArr.push(obj);
    }

    setGridArr(newGridArr);
  };

  const isAvailable = (num) => {
    let dateToCheck = dateFromNum(num, navDate);

    // if (enablePast === true) {
    //   return true;
    // }

    if (dateToCheck.isBefore(moment(), 'day')) {
      return false;
    } else {
      return true;
    }
  };

  const isToday = (day) => {
    let selectedDate = dateFromNum(day.value, navDate);
    const isToday = selectedDate.isSame(moment(), 'day');
    return isToday;
  };

  const isSelected = (day) => {
    let date = dateFromNum(day.value, navDate);
    const sameDay = date.isSame(selectedDate);
    return sameDay;
  };

//   const isPrevious = (day) => {
//     if (!initialEndDate && !initialStartDate) {
//       return false;
//     }

//     let selectedDate = dateFromNum(day.value, navDate);
//     const isPrev = moment(new Date(initialStartDate)).isSame(moment(selectedDate), 'day');
//     return isPrev;
//   };

//   const isNext = (day) => {
//     if (!initialEndDate && !initialStartDate) {
//       return false;
//     }

//     let selectedDate = dateFromNum(day.value, navDate);
//     const isNext = moment(new Date(initialEndDate)).isSame(moment(selectedDate), 'day');
//     return isNext;
//   };

//   const isInRange = (day) => {
//     if (!initialEndDate && !initialStartDate) {
//       return false;
//     }
//     let selectedDate = dateFromNum(day.value, navDate);
//     const isInRange =
//       selectedDate.isAfter(moment(initialStartDate)) &&
//       selectedDate.isBefore(moment(initialEndDate).add(1, 'day')) &&
//       day.value !== 0;
//     return isInRange;
//   };

  const dateFromNum = (num, referenceDate) => {
    let returnDate = moment(referenceDate);
    return returnDate.date(num);
  };

//   const clearSelection = () => {
//     setSelectedDate('');
//     // onSelectStartDate({ selectedDate: '' });
//     // onSelectEndDate({ selectedDate: '' });
//   };

//   const selectDate1 = (day) => {
//     onSelectStartDate({ selectedDate });
//   };

//   const selectDate2 = (day) => {
//     onSelectEndDate({ selectedDate });
//   };

  const selectDay = (day) => {
    setSelectedDate(dateFromNum(day.value, navDate));
  };

  const changeNavMonth = (num) => {
    if (canChangeNavMonth(num)) {
      
        setNavDate((prevNavDate) => moment(prevNavDate).add(num, 'month'));
        makeGrid();
    }
  };

  const canChangeNavMonth = (num) => {
    const clonedDate = moment(navDate).add(num, 'month');
    const minDate = moment().add(-100, 'month');
    const maxDate = moment().add(100, 'year');

    return clonedDate.isBetween(minDate, maxDate);
  };

  return (
    <div className="h-inherit flex items-start justify-between gap-x-8">
        <div className='w-full'>
            <div className="">
                <div className="flex items-center justify-between pb-3">
                    <div>

                    <button className="" onClick={() => changeNavMonth(-1)} disabled={!canChangeNavMonth(-1)}>
                        <ChevronIcon className={`w-5 h-5 text-gray-400`} />
                    </button>

                    </div>
                    <div className="font-[600] text-[#344054] text-center text-[16px] font-orbitron uppercase">
                    {navDate.format('MMMM YYYY')}
                    </div>
                    <div>

                    <button className="" onClick={() => changeNavMonth(1)} disabled={!canChangeNavMonth(1)}>
                        <ChevronIcon className={`w-5 h-5 text-gray-400 rotate-180`} />
                    </button>

                    </div>
                </div>
                <div className="calendar-container mt-3">
                    <div className="grid grid-cols-7 gap-4 mb-3">
                    {weekDaysHeaderArr.map((day, index) => (
                        <div key={index} className="text-center  text-[14px] font-[500] text-[#344054] font-outfit">
                        {day}
                        </div>
                    ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-2 mt-3">
                    {gridArr.map((day, index) => (
                        <div
                        key={index}
                        className={`hover:bg-gray-100 transition duration-200 text-center text-[14px] rounded-full font-[400] font-tomato p-[5px] relative flex items-center justify-center w-full h-[40px] ${
                            day.past ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        >
                        {day.value !== 0 && (
                            <button
                                onClick={() => selectDay(day)}
                                className={`flex flex-col gap-y-1 items-center justify-center mx-auto rounded- relative w-full h-full text-[15px] font-orbitron bg-transparent`}
                            >
                                <span className={`rounded-full flex items-center justify-center w-[50px] h-[50px] ${
                                    isSelected(day)
                                    ? 'bg-accent text-white'
                                    : 'bg-transparent'
                                }`}>
                                    {day.value}
                                </span>
                                {isToday(day) && (
                                    <div className="w-[6px] h-[6px] rounded-full bg-vcm-purple block absolute -bottom-[5px]"></div>
                                )}
                            </button>
                        )}
                        {day.value === 0 && <button></button>}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Calendar