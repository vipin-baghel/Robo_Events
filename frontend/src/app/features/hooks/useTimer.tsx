"use client"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react'
import { CountdownProps } from '../types';

const useTimer = (targetDateString: string): CountdownProps => {
     const [timeLeft, setTimeLeft] = useState<CountdownProps>({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        });
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const targetDate = new Date(targetDateString);
        useEffect(() => {
            const interval = setInterval(() => {
                const now = new Date();
                const difference = targetDate.getTime() - now.getTime();
                
                if(difference < 0){
                    clearInterval(interval);
                    return;
                }
    
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
                setTimeLeft({days, hours, minutes, seconds});
            }, 1000);
            
            return () => clearInterval(interval);
        }, [targetDate])
  
        return timeLeft;
}

export default useTimer

