// Timer.js
'use client'
import { useState, useEffect } from 'react';
import './Timer.css'
const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime); // 10 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime]);

  useEffect(() => {
    if (time === 0) {
      onTimeUp(); // Invoke the callback when time is up
    }
  }, [time, onTimeUp]);

  return <div className='timer'>Time remaining: {time} seconds</div>;
};

export default Timer;
