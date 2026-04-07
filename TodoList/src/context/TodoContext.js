import { createContext, useContext } from "react";

// Todo 관련 데이터와 함수를 전역으로 공급하는 Context
export const TodoContext = createContext();

// 커스텀 훅 - useContext(TodoContext) 반복 작성 생략용
export function useTodo() {
    return useContext(TodoContext);
}
