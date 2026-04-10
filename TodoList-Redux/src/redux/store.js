import {
    configureStore,
    createSlice
} from "@reduxjs/toolkit";
import { dateString } from "../utils";

const mockData = [{
        id: 0,
        isDone: false,
        content: "React study",
        date: dateString
    },
    {
        id: 1,
        isDone: false,
        content: "JavaScript study",
        date: dateString
    },
    {
        id: 2,
        isDone: false,
        content: "CSS study",
        date: dateString
    },
];

const savedTodos = JSON.parse(localStorage.getItem("todos")) || mockData;

const todoSlice = createSlice({
    name: "todo",
    initialState: savedTodos, // 초기 상태는 localStorage에서 불러오거나 mockData 이용
    reducers: {
        // CREATE: 새 todo 추가
        createTodo(state, action){
            // action.payload = { id, isDone, content, date } 형태의 새 todo 객체
            state.push(action.payload); // Immer 덕분에 push로도 불변성 유지되므로 간단히 추가 가능
        },

        // UPDATE: isDone 토글 (체크박스)
        updateTodo(state, action){
            // action.payload = 토글할 todo의 id
            const todo = state.find((t) => t.id === action.payload);
            if (todo) {
                todo.isDone = !todo.isDone;
            }
        },

        // DELETE: todo 삭제
        deleteTodo(state, action){
            // action.payload = 삭제할 todo의 id
            return state.filter((t) => t.id !== action.payload);
        }
    }
});

export const { createTodo, updateTodo, deleteTodo } = todoSlice.actions;

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
    }
});

// store 상태가 바뀔 때마다 localStorage에 저장
store.subscribe(() => {
    localStorage.setItem("todos", JSON.stringify(store.getState().todo));
});
