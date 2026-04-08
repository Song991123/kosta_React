import React, { useEffect, useRef, useState } from "react";
import { useTodoDispatch } from "../context/TodoContext";
import styled from 'styled-components';

const EditorWrapper = styled.div`
    display: flex;
    gap: 10px;

    // input 요소
    input{
        flex: 1; /* 입력창이 남은 공간을 모두 차지하도록 설정 */
        padding: 15px;
        border: 1px solid rgb(220, 220, 220);
        border-radius: 5px;
    }

    // button 요소
    button{
        width: 80px;
        background-color: rgb(37,147,255);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;


export default function Editor() {
    const { onCreate } = useTodoDispatch();
    const inputRef = useRef();

    // 마운트 시 커서 놓기
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const [content, setContent] = useState("");
    return (
        <EditorWrapper>
            <input ref={inputRef} type="text" placeholder="새로운 todo" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={() => { onCreate(content); setContent(""); }}>추가</button>
        </EditorWrapper>
    );
}
