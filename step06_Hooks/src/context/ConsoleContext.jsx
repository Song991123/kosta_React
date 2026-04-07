import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ConsoleContext = createContext();

export function ConsoleProvider({ children }) {
    const logsRef = useRef([]);
    const subscribersRef = useRef([]);

    const log = useCallback((...args) => {
        const message = args
            .map(a => {
                if (a === null) return 'null';
                if (a === undefined) return 'undefined';
                if (typeof a === 'object') {
                    try { return JSON.stringify(a, null, 2); }
                    catch { return String(a); }
                }
                return String(a);
            })
            .join(' ');
        const time = new Date().toLocaleTimeString('ko-KR', { hour12: false });
        const entry = { id: Date.now() + Math.random(), message, time };
        logsRef.current = [...logsRef.current, entry];
        // ConsolePanel에만 알림 → 자식 컴포넌트 재렌더 없음
        subscribersRef.current.forEach(fn => fn(logsRef.current));
    }, []);

    const clearLogs = useCallback(() => {
        logsRef.current = [];
        subscribersRef.current.forEach(fn => fn([]));
    }, []);

    const subscribe = useCallback((fn) => {
        subscribersRef.current.push(fn);
        return () => {
            subscribersRef.current = subscribersRef.current.filter(f => f !== fn);
        };
    }, []);

    return (
        <ConsoleContext.Provider value={{ log, clearLogs, subscribe }}>
            {children}
        </ConsoleContext.Provider>
    );
}

// 각 컴포넌트용 - log 함수만, 재렌더 없음
export function useConsoleLog() {
    return useContext(ConsoleContext).log;
}

// ConsolePanel 전용 - 자체 state로 구독
export function useConsoleLogs() {
    const { subscribe, clearLogs } = useContext(ConsoleContext);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        return subscribe(setLogs);
    }, [subscribe]);

    return { logs, clearLogs };
}
