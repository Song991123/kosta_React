import { useMemo } from "react";
import { useState } from "react";
import { useConsoleLog } from '../context/ConsoleContext';
import '../styles/ex.css';

function Ex03_Memo() {
    const log = useConsoleLog();
    const [list, setList] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [str, setStr] = useState("합계");

    // list 배열의 값을 더하는 함수
    const getSumResult = () => {
        log("getSumResult 함수 실행");
        let sum = 0;
        list.forEach((item) => {
            sum += item;
        });
        return sum;
    }
    // list 배열이 변경될 때마다만 getSumResult 함수 실행
    const addResult = useMemo(() => getSumResult(), [list]); 
    return (
        <div className="ex-wrap">
            <div className="ex-btn-row">
                <button className="ex-btn" onClick={() => setStr("안녕")}>문자열 변경</button>
                <button className="ex-btn" onClick={() => setList([...list, list.length + 1])}>리스트 값 추가</button>
            </div>
            <div className="ex-list">
                {list.map((item) => <p key={item}>{item}</p>)}
            </div>

            {/* 이렇게 하면 문자열 변경 시에도 getSumResult 함수가 매번 실행됨 */}
            {/* <h3>{str} : {getSumResult()}</h3> */}
            {/* useMemo를 사용하면 list 배열이 변경될 때만 getSumResult 함수가 실행됨 */}
            <h3>{str} : {addResult}</h3>
        </div>
    );
}

export default Ex03_Memo;
