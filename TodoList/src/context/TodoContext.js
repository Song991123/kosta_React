import { createContext, useContext } from "react";

// todos 상태값만 공급 - todos가 바뀔 때마다 이 Context 구독자만 재렌더
export const TodoStateContext = createContext();

// 함수들만 공급 - useCallback([])으로 생성되어 절대 안 바뀜 → 구독자 재렌더 없음
export const TodoDispatchContext = createContext();

// todos가 필요한 컴포넌트용 (List 등)
export function useTodoState() {
    return useContext(TodoStateContext);
}

// onCreate, onUpdate, onDelete가 필요한 컴포넌트용 (Editor, TodoItem 등)
export function useTodoDispatch() {
    return useContext(TodoDispatchContext);
}
