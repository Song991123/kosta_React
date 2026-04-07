import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useConsoleLog } from '../context/ConsoleContext';
import '../styles/ex.css';

function Ex04_Ref() {
    const log = useConsoleLog();
    const inputRef = useRef();

    // 처음 로딩될 때 커서 놓기
    useEffect(() => {
        log("inputRef:", inputRef.current);
        inputRef.current.focus();
    }, []);

    const login = () => {
        alert(`로그인 되었습니다. ${inputRef.current.value}님`);
        inputRef.current.focus();
    }

    return (
        <div className="ex-wrap">
            <div className="ex-btn-row">
                <input className="ex-input" type="text" ref={inputRef} />
                <button className="ex-btn" onClick={login}>로그인</button>
            </div>
        </div>
    );
}

export default Ex04_Ref;
