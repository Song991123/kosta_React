import React from "react";
import { useState } from "react";
import styled from 'styled-components';
import TodoItem from "./TodoItem";
import { useTodo } from "../context/TodoContext";

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    // input 요소
    > input{
        width: 100%;
        padding: 15px;
        border : none;
        border-bottom: 1px solid rgb(220, 220, 220);
        border-radius: 15px 0px;
    }

    > input:focus{
        outline: none;
        border-bottom: 1px solid rgb(37,147,255);
    }
`;

const TodosWrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

export default function List() {
    const { todos } = useTodo();
    const [search, setSearch] = useState("");

    // 검색어가 포함된 todo만 필터링 (대소문자 구분 없이)
    const filteredTodos = todos.filter((todo) =>
        todo.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ListWrapper>
            <h4>Todo List ✅ </h4>
            <input type="text" placeholder="검색어를 입력해주세요." value={search} onChange={(e) => setSearch(e.target.value)}/>
            <TodosWrapper>
                {filteredTodos.map((todo) => {
                    return <TodoItem key={todo.id} {...todo}/>
                })}
            </TodosWrapper>
        </ListWrapper>
    );
}
