import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../redux/store";
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
    const dispatch = useDispatch();
    const inputRef = useRef();

    const todos = useSelector((state) => state.todo);
    const idRef = useRef(todos.length);

    // 마운트 시 커서 놓기
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const [content, setContent] = useState("");
    return (
        <EditorWrapper>
            <input ref={inputRef} type="text" placeholder="새로운 todo" value={content} onChange={(e) => setContent(e.target.value)} />
            {/* TODO 5: 버튼 클릭 시 onCreate(content) 대신 dispatch(create({...})) 를 사용하세요.
                dispatch( create({ id: idRef.current++, isDone: false, content, date: 오늘날짜 }) ) */}
            <button onClick={() => { dispatch(createTodo({ id: idRef.current++, isDone: false, content, date: new Date().toLocaleDateString() })); setContent(""); }}>추가</button>
        </EditorWrapper>
    );
}
