import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./Cal";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar({ billsUnpaidDates, billsPaidDates, billsOverdueDates }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const cn = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="flex justify-center mx-auto items-center flex-col">
      <div className="w-80 h-80">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
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
                className="p-2 text-center h-14 grid place-content-center text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-black text-white" : "",
                    selectDate.toDate().toDateString() === date.toDate().toDateString()
                      ? "bg-black text-white"
                      : billsUnpaidDate
                      ? "bg-indigo-100"
                      : billsPaidDate
                      ? "bg-gray-200"
                      : billsOverdueDate
                      ? "bg-red-100"
                      : "",
                    "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                  )}
                  // onClick={() => {
                  //   setSelectDate(date);
                  // }}
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
