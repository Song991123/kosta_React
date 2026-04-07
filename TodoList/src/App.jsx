import { useCallback, useEffect, useReducer, useRef, useMemo } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";
import styled from "styled-components";
import { TodoStateContext, TodoDispatchContext } from "./context/TodoContext";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  margin: 0 auto;
`;

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
const day = String(today.getDate()).padStart(2, "0"); // 두 자리수로 맞춤

const mockData = [
  { id: 0, isDone: false, content: "React study",      date: year + "-" + month + "-" + day },
  { id: 1, isDone: false, content: "JavaScript study", date: year + "-" + month + "-" + day },
  { id: 2, isDone: false, content: "CSS study",        date: year + "-" + month + "-" + day },
];

// action.type에 따라 todos 상태를 어떻게 바꿀지 정의하는 순수 함수
// useState의 setTodos 대신 dispatch({ type, ... }) 로 상태 변경을 요청함
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      // 기존 배열 뒤에 새 todo 추가
      return [...state, action.data];
    case "UPDATE":
      // id가 일치하는 항목의 isDone만 반전
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "DELETE":
      // id가 일치하는 항목 제거
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

function App() {
  // localStorage에서 불러오기, 없으면 mockData 사용
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || mockData;

  // useReducer(reducer, 초기값) → [현재상태, dispatch] 반환
  // dispatch는 React가 렌더링과 무관하게 항상 동일한 참조를 보장함
  const [todos, dispatch] = useReducer(reducer, savedTodos);

  // id 카운터 - 저장된 todos 중 가장 큰 id + 1로 초기화
  const idRef = useRef(
    savedTodos.length > 0 ? Math.max(...savedTodos.map((t) => t.id)) + 1 : 0,
  );

  // todos가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // dispatch는 항상 고정 참조 → useCallback([]) 으로 함수 참조도 고정
  // TodoItem의 memo가 실제로 동작하려면 이 함수들이 재렌더마다 새로 생성되면 안 됨

  // 추가: CREATE 액션으로 새 todo 객체를 dispatch
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++, // 호출할 때마다 1씩 증가, 재렌더 없음
        isDone: false,
        content,
        date: year + "-" + month + "-" + day,
      },
    });
  }, []);

  // 수정: UPDATE 액션으로 해당 id의 isDone 토글 요청
  const onUpdate = useCallback((id) => {
    dispatch({ type: "UPDATE", id });
  }, []);

  // 삭제: DELETE 액션으로 해당 id 제거 요청
  const onDelete = useCallback((id) => {
    dispatch({ type: "DELETE", id });
  }, []);

  // 함수 3개를 useMemo로 묶어서 TodoDispatchContext에 공급
  // 이 객체도 한 번만 생성되므로 Context 값이 바뀌지 않음
  const memoizedDispatch = useMemo(() => ({ onCreate, onUpdate, onDelete }), []);

  return (
    <TodoStateContext.Provider value={ todos }>
      <TodoDispatchContext.Provider value={memoizedDispatch}>
        <AppWrapper>
          <Header />
          <Editor />
          <List />
        </AppWrapper>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
