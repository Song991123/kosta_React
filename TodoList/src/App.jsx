import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';
import styled from 'styled-components';
import { TodoContext } from './context/TodoContext';


const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  margin: 0 auto;
`;

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
const day = String(today.getDate()).padStart(2, '0');         // 두 자리수로 맞춤

const mockData = [
  { id : 0, isDone : false, content: "React study", date: year + '-' + month + '-' + day},
  { id : 1, isDone : false, content: "JavaScript study", date: year + '-' + month + '-' + day},
  { id : 2, isDone : false, content: "CSS study", date: year + '-' + month + '-' + day},
]

function App() {
  // localStorage에서 불러오기, 없으면 mockData 사용
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || mockData;
  const [todos, setTodos] = useState(savedTodos);
  // id 카운터 - 저장된 todos 중 가장 큰 id + 1로 초기화
  const idRef = useRef(savedTodos.length > 0 ? Math.max(...savedTodos.map(t => t.id)) + 1 : 0);

  // todos가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 추가하기 (todos 상태에 새로운 todo 추가)
  const onCreate = useCallback((content) => {
    const newTodo = {
      id: idRef.current++, // 호출할 때마다 1씩 증가, 재렌더 없음
      isDone: false,
      content: content,
      date: year + '-' + month + '-' + day
    };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  // 수정하기 (id가 일치하는 todo의 isDone 값을 반전)
  // todos 대신 함수형 업데이트(prev)를 써야 [] 의존성 유지 가능
  const onUpdate = useCallback((id) => {
    setTodos(prev => prev.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ));
  }, []);

  // 삭제하기 (todos 상태에서 id가 일치하는 todo 제거)
  const onDelete = useCallback((id) => {
    setTodos(prev => prev.filter((todo) => todo.id !== id));
  }, []);


  return (
    <TodoContext.Provider value={{ todos, onCreate, onUpdate, onDelete }}>
      <AppWrapper>
        <Header/>
        <Editor/>
        <List/>
      </AppWrapper>
    </TodoContext.Provider>
  )
}

export default App
