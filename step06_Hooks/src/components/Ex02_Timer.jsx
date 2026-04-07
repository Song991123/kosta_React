import React from "react";
import { useEffect } from "react";
import { useConsoleLog } from '../context/ConsoleContext';
import '../styles/ex.css';

function Ex02_Timer() {
    const log = useConsoleLog();

    // 마운트 시 1초마다 콘솔에 출력
    useEffect(() => {
        const timer = setInterval(() => {
            log("Timer 실행 중...");
        }, 1000);
        
        // 언마운트 시 타이머 제거
        return () => {
            clearInterval(timer);
        }
    }, []);
    return (
        <>
            <span className="ex-timer">Timer</span>
        </>
    );
}

export default Ex02_Timer;
