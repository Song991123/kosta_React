import React, { memo } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/store";

const TodoItemWrapper = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(240, 240, 240);

    // input 요소
    > input{
        width: 20px;
    }
    > input:checked + div{
        text-decoration: line-through;
        color: gray;
    }

    // button 요소
    > button{
        cursor: pointer;
        color: gray;
        border: none;
        font-size: 14px;
        border-radius: 5px;
        padding:5px;
    }
`;

const Content = styled.div`
    flex: 1;
`;

const DateText = styled.div`
    color: gray;
    font-size: 14px;
`;

// memo: props가 바뀌지 않으면 재렌더 스킵
const TodoItem = memo(function TodoItem({ id, isDone, content, date }) {
    const dispatch = useDispatch();

    const onChnageCheckbox = () => {
        dispatch(updateTodo(id));
    }

    return (
        <TodoItemWrapper>
            <input type="checkbox" checked={isDone} onChange={onChnageCheckbox}/>
            <Content>{content}</Content>
            <DateText>{date}</DateText>
            <button onClick={() => dispatch(deleteTodo(id))}>삭제</button>
        </TodoItemWrapper>
    )
});

export default TodoItem;
