import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">React 학습 노트</h1>
        <p className="app-subtitle">
          <span>📘 JSX</span>
          <span>🔗 Props</span>
          <span>📦 배열 구조 분해 할당</span>
        </p>
      </div>
      <TestComponent />
      <ParentComponent />
      <ArrayComponent />
    </div>
  );
}


// ================== JSX 문법 공부 =================
function TestComponent() {
  const message = "Hello, Vite + React!";

  const student = {
    name: "홍길동",
    age: 20,
    grade: "A",
  };

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div className="card">
      <span className="card-badge">01 · JSX</span>
      <h1>JSX 문법 공부</h1>
      <h2>{message}</h2>
      <h3 className="test">
        {student.name} 학생은 {student.age}살이고, 학점은 {student.grade}입니다.
      </h3>

      <div className="count-display">{count}</div>
      <div className={`count-status ${count % 2 === 0 ? "even" : "odd"}`}>
        {count % 2 === 0 ? "짝수 (Even)" : "홀수 (Odd)"}
      </div>

      <div className="btn-group">
        <button onClick={handleClick}>+ 카운트 증가</button>
        <button className="btn-reset" onClick={handleReset}>↺ 리셋</button>
      </div>
    </div>
  );
}

// props를 이용해서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법
function ChildComponent({ message, result, emoji = "💬" }) {
  return (
    <div style={{ background: "#f7f8ff", borderRadius: "10px", padding: "12px 16px", marginBottom: "10px" }}>
      <p style={{ fontWeight: 700, color: "#2d2d5e", margin: "0 0 4px" }}>{emoji} {message}</p>
      <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>{result}</p>
    </div>
  );
}

function ParentComponent() {
  const children = [
    { message: "Hello from Parent!", result: "부모에서 자식으로 전달된 첫 번째 메시지입니다.", emoji: "👋" },
    { message: "Props는 읽기 전용", result: "자식 컴포넌트는 props를 직접 수정할 수 없습니다.", emoji: "🔒" },
    { message: "재사용 가능한 컴포넌트", result: "같은 컴포넌트에 다른 props를 넘겨 재사용합니다.", emoji: "♻️" },
  ];

  return (
    <div className="card">
      <span className="card-badge">02 · Props</span>
      <h1>Props 전달</h1>
      {children.map((child, idx) => (
        <ChildComponent key={idx} {...child} />
      ))}
    </div>
  );
}

function ArrayComponent() {
  // 배열 구조 분해 할당 예시
  const numbers = [1, 2, 3, 4, 5];
  // 배열의 길이와 요소들을 구조 분해 할당으로 추출
  const { length } = numbers;
  // 객체 구조 분해 할당으로 배열의 요소 추출 (인덱스 기반)
  const { 0: first, 1: second } = numbers;
  // 배열 구조 분해 할당으로 요소 추출
  const [firstElement, secondElement, thirdElement, fourthElement, fifthElement] = numbers;
  // rest 패턴을 이용한 배열 구조 분해 할당
  const [firstEl, secondEl, ...rest] = numbers;

  return (
    <div className="card">
      <span className="card-badge">03 · 배열</span>
      <h1>배열 구조 분해 할당</h1>

      <p style={{ color: "#888", marginBottom: 12 }}>원본 배열</p>
      <div className="array-grid">
        {numbers.map((n) => (
          <span key={n} className="array-chip">{n}</span>
        ))}
      </div>

      <hr />
      <div className="info-row"><span className="label">배열 길이</span><span className="value">{length}</span></div>
      <div className="info-row"><span className="label">첫 번째 (객체 구조 분해)</span><span className="value">{first}</span></div>
      <div className="info-row"><span className="label">두 번째 (객체 구조 분해)</span><span className="value">{second}</span></div>

      <hr />
      <p style={{ color: "#888", margin: "0 0 8px", fontSize: "0.85rem" }}>배열 구조 분해 할당</p>
      {[firstElement, secondElement, thirdElement, fourthElement, fifthElement].map((val, idx) => (
        <div key={idx} className="info-row">
          <span className="label">{idx + 1}번째 요소</span>
          <span className="value">{val}</span>
        </div>
      ))}

      <hr />
      <div className="info-row"><span className="label">첫 번째 (rest 패턴)</span><span className="value">{firstEl}</span></div>
      <div className="info-row"><span className="label">두 번째 (rest 패턴)</span><span className="value">{secondEl}</span></div>
      <div className="info-row"><span className="label">나머지 (...rest)</span><span className="value">[{rest.join(", ")}]</span></div>
    </div>
  );
}

export default App;
