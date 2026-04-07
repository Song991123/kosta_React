import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useConsoleLog } from '../context/ConsoleContext';
import '../styles/ex.css';
/**
 * Ref와 let의 차이
 */
export default function Ex04_ReRender() {
    const log = useConsoleLog();
    const countRef = useRef(0);
    let countLet = 0;

    // 화면갱신(리렌더링)을 위한 변수
    const [render, setRender] = useState(false);

    // 렌더링 로그
    React.useEffect(() => {
        log("Ex04_ReRender 렌더링");
    }, [render]);

    // Ref는 값이 변경되어도 컴포넌트가 리렌더링되지 않음
    const refUp = () => {
        countRef.current = countRef.current + 1;
        log("countRef.current : ", countRef.current);
    }

    // let은 값이 변경되어도 컴포넌트가 리렌더링되지 않음. 
    // 하지만 let은 컴포넌트가 리렌더링될 때 초기화되므로 값이 유지되지 않음
    const letUp = () => {
        countLet = countLet + 1;
        // log 호출 시 setLogs → 재렌더 → countLet 리셋되므로 여기선 로그 생략
        // Re-Render 버튼으로 값 비교 확인
    }

    return <div className="ex-wrap">
        <p>Ref: {countRef.current}</p>
        <p>Let: {countLet}</p>
        <div className="ex-btn-row">
            <button className="ex-btn" onClick={refUp}>Ref Up</button>
            <button className="ex-btn" onClick={letUp}>Let Up</button>
            {/* Re-Render 버튼을 클릭하면 컴포넌트가 리렌더링됨 
                countRef와 countLet의 값이 화면에 반영됨 
                render+1의 이유 : render는 상태(state)이므로 값이 변경되면 컴포넌트가 리렌더링됨. 
                                 때문에 임의로 1을 더해줌 */}
            <button className="ex-btn" onClick={() => {
                setRender(render+1);
                log(`Re-Render! → Ref: ${countRef.current}, Let: ${countLet} (리셋됨)`);
            }}>Re-Render</button>
        </div>
    </div>;
}
