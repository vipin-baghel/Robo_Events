"use client"
import React from 'react'
import useTimer from '../hooks/useTimer';

interface CountdownTimerProps {
  startDate: string;
}

const CountdownTimer = ({startDate}: CountdownTimerProps) => {
    const { days, hours, minutes, seconds } = useTimer(startDate);
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl text-white font-semibold">{days}</h2>
        <h3 className="uppercase text-sm text-gray-400 font-semibold">Days</h3>
      </div>
      <p className="text-3xl font-bold text-gray-400">:</p>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl text-white font-semibold">{hours}</h2>
        <h3 className="uppercase text-sm text-gray-400 font-semibold">Hour</h3>
      </div>
      <p className="text-3xl font-bold text-gray-400">:</p>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl text-white font-semibold">{minutes}</h2>
        <h3 className="uppercase text-sm text-gray-400 font-semibold">
          Minutes
        </h3>
      </div>
      <p className="text-3xl font-bold text-gray-400">:</p>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl text-white font-semibold">{seconds}</h2>
        <h3 className="uppercase text-sm text-gray-400 font-semibold">
          Seconds
        </h3>
      </div>
    </div>
  )
}

export default CountdownTimer
