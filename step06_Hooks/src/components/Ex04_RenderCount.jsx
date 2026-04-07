import React from "react";
import { useEffect } from "react";
import { useConsoleLog } from '../context/ConsoleContext';
import '../styles/ex.css';

export default function Ex04_RenderCount() {
    const log = useConsoleLog();
    const [count, setCount] = React.useState(0);
    // const [renderCount, setRenderCount] = React.useState(1);
    const countRef = React.useRef(-1);

    // 렌더링 된 횟수 계산
    useEffect(() => {
        // 렌더링이 될 때마다 renderCount를 1씩 증가시킴. 그런데 이러면 렌더링이 될 때마다 renderCount가 변경되므로 무한 렌더링이 발생함.
        // setRenderCount(renderCount + 1);
        countRef.current = countRef.current + 1; // 리렌더링 안됨
    });

    // count 변경 시 로그 출력 (매 렌더 log 호출 시 setLogs → 무한 재렌더 발생하므로 분리)
    useEffect(() => {
        log(`카운트: ${count}, 렌더링 횟수: ${countRef.current}`);
    }, [count]);

    return <div className="ex-wrap">
        <p>count = {count}, 렌더링 횟수: {countRef.current + 1}</p>
        <button className="ex-btn" onClick={() => setCount(count + 1)}>카운트 증가</button>
    </div>;
}
