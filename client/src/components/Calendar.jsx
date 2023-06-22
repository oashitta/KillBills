import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./Cal";

export default function Calendar({ billsUnpaidDates, billsPaidDates, billsOverdueDates }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const cn = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="flex justify-center mx-auto items-center flex-col">
      <div className="w-60 h-60 md:w-80 md:h-80">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:scale-105 transition-all dark:stroke-gray-200"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:scale-105 transition-all dark:stroke-gray-200"
              onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-10 w-10 md:h-14 md:w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year(), billsUnpaidDates).map(({ date, currentMonth, today }, index) => {
            const billsUnpaidDate = billsUnpaidDates && billsUnpaidDates.includes(date.format("YYYY-MM-DD"));
            const billsPaidDate = billsPaidDates && billsPaidDates.includes(date.format("YYYY-MM-DD"));
            const billsOverdueDate = billsOverdueDates && billsOverdueDates.includes(date.format("YYYY-MM-DD"));
            
            return (
              <div
                key={index}
                className="p-2 text-center h-10 md:h-14 grid place-content-center text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-black text-white" : "",
                    selectDate.toDate().toDateString() === date.toDate().toDateString()
                      ? "bg-black text-white dark:bg-yellow-200 dark:text-black"
                      : billsUnpaidDate
                      ? "bg-indigo-100 dark:bg-indigo-200 dark:text-black"
                      : billsOverdueDate
                      ? "bg-red-100 dark:bg-red-200 dark:text-red-900"
                      : billsPaidDate
                      ? "bg-gray-200 dark:text-black"
                      : "",
                    "h-8 w-8 md:h-10 md:w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                  )}
                >
                  {date.date()}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
