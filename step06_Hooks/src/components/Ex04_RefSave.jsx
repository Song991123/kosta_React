import React from "react";
import { useConsoleLog } from '../context/ConsoleContext';
import '../styles/ex.css';

/**
 * ref는 "값은 기억하되, 화면은 다시 그리지 않아도 될 때" 사용.
 */
export default function Ex04_RefSave() {
    const log = useConsoleLog();

    const [count, setCount] = React.useState(0);
    const countRef = React.useRef(0);

    // 렌더링 로그 (렌더 중 setState 호출 방지)
    React.useEffect(() => {
        log("Ex04_RefSave 렌더링");
    }, [count]);

    // State는 값이 변경되면 컴포넌트가 리렌더링됨
    const stateUp = () => {
        setCount(count + 1);
    }

    // Ref는 값이 변경되어도 컴포넌트가 리렌더링되지 않음
    const refUp = () => {
        countRef.current = countRef.current + 1;
        log("ref : ", JSON.stringify(countRef.current));
    }

    return <div className="ex-wrap">
        <p>State: {count}</p>
        <p>Ref: {countRef.current}</p>
        <div className="ex-btn-row">
            <button className="ex-btn" onClick={stateUp}>State Up</button>
            <button className="ex-btn" onClick={refUp}>Ref Up</button>
        </div>
    </div>;
}
