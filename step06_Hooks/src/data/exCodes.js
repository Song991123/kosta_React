export const exData = {
  Ex02_Effect: {
    title: 'Ex02 Effect',
    description:
      'useEffect의 cleanup 함수를 이용해 자원을 정리하는 예제. ' +
      'Toggle 버튼으로 Ex02_Timer를 마운트/언마운트하면, ' +
      '타이머가 setInterval로 생성되고 언마운트 시 clearInterval로 정리된다.',
    code:
`// Ex02_Effect.jsx
import { useState } from 'react';
import Ex02_Timer from "./Ex02_Timer";

export function Ex02_Effect() {
    const [state, setState] = useState(0);
    return (
        <>
            <h3>Effect - 자원 정리</h3>
            {state && <Ex02_Timer />}
            <button onClick={() => setState(!state)}>Toggle Button</button>
        </>
    );
}

// Ex02_Timer.jsx
function Ex02_Timer() {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Timer 실행 중...");
        }, 1000);

        // 언마운트 시 타이머 제거
        return () => {
            clearInterval(timer);
        }
    }, []);
    return <span>Timer</span>;
}`,
  },

  Ex03_Memo: {
    title: 'Ex03 Memo',
    description:
      'useMemo는 값을 메모이제이션한다. ' +
      'list가 바뀔 때만 합계를 재계산하고, 문자열만 바뀌면 재계산하지 않는다. ' +
      '"문자열 변경" 버튼과 "리스트 값 추가" 버튼을 눌러보며 콘솔로 확인해보자.',
    code:
`import { useMemo, useState } from "react";

function Ex03_Memo() {
    const [list, setList] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [str, setStr] = useState("합계");

    // list 배열의 값을 더하는 함수
    const getSumResult = () => {
        let sum = 0;
        list.forEach((item) => { sum += item; });
        return sum;
    }

    // list가 변경될 때만 getSumResult 실행
    const addResult = useMemo(() => getSumResult(), [list]);

    return (
        <div>
            <button onClick={() => setStr("안녕")}>문자열 변경</button>
            <button onClick={() => setList([...list, list.length + 1])}>
                리스트 값 추가
            </button>
            {list.map((item) => <p key={item}>{item}</p>)}
            <h3>{str} : {addResult}</h3>
        </div>
    );
}`,
  },

  Ex04_Ref: {
    title: 'Ex04 Ref',
    description:
      'useRef로 DOM 요소에 직접 접근하는 예제. ' +
      '마운트 시 input에 자동으로 포커스되고, ' +
      '로그인 버튼 클릭 시 ref.current.value로 입력값을 읽어온다.',
    code:
`import { useEffect, useRef } from 'react';

function Ex04_Ref() {
    const inputRef = useRef();

    // 처음 로딩될 때 커서 놓기
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const login = () => {
        alert(\`로그인 되었습니다. \${inputRef.current.value}님\`);
        inputRef.current.focus();
    }

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={login}>로그인</button>
        </div>
    );
}`,
  },

  Ex04_RefSave: {
    title: 'Ex04 RefSave',
    description:
      'State vs Ref 비교 예제. ' +
      'State는 변경 시 리렌더링이 발생하지만, ' +
      'Ref는 값이 변경되어도 리렌더링이 발생하지 않는다. ' +
      '"Ref Up" 후 화면이 안 바뀌는 것을 확인해보자.',
    code:
`/**
 * ref는 "값은 기억하되, 화면은 다시 그리지 않아도 될 때" 사용.
 */
export default function Ex04_RefSave() {
    const [count, setCount] = React.useState(0);
    const countRef = React.useRef(0);

    // State는 값이 변경되면 컴포넌트가 리렌더링됨
    const stateUp = () => { setCount(count + 1); }

    // Ref는 값이 변경되어도 컴포넌트가 리렌더링되지 않음
    const refUp = () => {
        countRef.current = countRef.current + 1;
        console.log("ref : ", countRef);
    }

    return (
        <div>
            <p>State: {count}</p>
            <p>Ref: {countRef.current}</p>
            <button onClick={stateUp}>State Up</button>
            <button onClick={refUp}>Ref Up</button>
        </div>
    );
}`,
  },

  Ex04_ReRenderer: {
    title: 'Ex04 ReRenderer',
    description:
      'Ref vs let 비교 예제. ' +
      'let 변수는 리렌더링 때마다 초기화되지만, ' +
      'Ref는 리렌더링 후에도 값이 유지된다. ' +
      '"Re-Render" 버튼을 눌러 두 값을 비교해보자.',
    code:
`/**
 * Ref와 let의 차이
 */
export default function Ex04_ReRender() {
    const countRef = useRef(0);
    let countLet = 0;
    const [render, setRender] = useState(false);

    // Ref는 값이 변경되어도 리렌더링 안됨. 값은 유지됨
    const refUp = () => { countRef.current = countRef.current + 1; }

    // let은 리렌더링 시 초기화되므로 값이 유지되지 않음
    const letUp = () => { countLet = countLet + 1; }

    return (
        <div>
            <p>Ref: {countRef.current}</p>
            <p>Let: {countLet}</p>
            <button onClick={refUp}>Ref Up</button>
            <button onClick={letUp}>Let Up</button>
            {/* render state를 변경해 강제 리렌더링 */}
            <button onClick={() => setRender(render+1)}>Re-Render</button>
        </div>
    );
}`,
  },

  Ex04_RenderCount: {
    title: 'Ex04 RenderCount',
    description:
      '렌더링 횟수를 Ref로 추적하는 예제. ' +
      'useState로 렌더 횟수를 세면 무한 루프가 발생하기 때문에 ' +
      'useRef를 사용한다. "카운트 증가" 버튼 후 Re-Render로 확인해보자.',
    code:
`export default function Ex04_RenderCount() {
    const [count, setCount] = React.useState(0);
    // useState로 렌더 횟수 세면 → 무한 렌더링 발생
    // const [renderCount, setRenderCount] = React.useState(1);
    const countRef = React.useRef(0);

    // 렌더링될 때마다 실행
    useEffect(() => {
        countRef.current = countRef.current + 1; // 리렌더링 안됨
    });

    return (
        <div>
            <p>count = {count}, 렌더링 횟수: {countRef.current}</p>
            <button onClick={() => setCount(count + 1)}>카운트 증가</button>
        </div>
    );
}`,
  },
  CommentList: {
    title: 'CommentList',
    description:
      'styled-components로 스타일링한 댓글 목록 컴포넌트. ' +
      'CommentList가 comments 배열을 map으로 순회하며 Comment 컴포넌트에 props를 전달한다.',
    code:
`// CommentList.jsx
export default function CommentList() {
    const comments = [
        { name: "홍길동", comment: "안녕하세요. 반갑습니다." },
        { name: "김철수", comment: "리액트 너무 재밌어요!" },
        { name: "박영희", comment: "오늘 날씨가 정말 좋네요." }
    ];
    return (
        <div>
            {comments.map((comment, index) => (
                <Comment key={index} nameText={comment.name} commentText={comment.comment} />
            ))}
        </div>
    );
}

// Comment.jsx (styled-components)
const Wrapper = styled.div\`
    display: flex; flex-direction: row;
    border: 1px solid gray; border-radius: 16px;
    margin: 8px; padding: 8px;
\`;
const NameText = styled.span\`font-weight: bold;\`;
const CommentText = styled.span\`font-size: 16px;\`;

export default function Comment({ profile, nameText, commentText }) {
    return (
        <Wrapper>
            <ImageContainer><Image src={profile} /></ImageContainer>
            <ContentContainer>
                <NameText>{nameText}</NameText>
                <CommentText>{commentText}</CommentText>
            </ContentContainer>
        </Wrapper>
    );
}`,
  },
  Ex08_Context: {
    title: 'Ex08 Context',
    description:
      'Context API로 컴포넌트 트리 전체에 데이터를 공급하는 예제. ' +
      'Ex08_Context → Child01 → Child02 → Child03 순서로 중첩되어 있으며, ' +
      'prop drilling 없이 GlobalContext를 통해 list, setList, btnClick을 공유한다.',
    code:
`// Context 생성
export const GlobalContext = createContext();

// Provider로 자식 전체에 값 공급
<GlobalContext.Provider value={{list, setList, btnClick01, btnClick02}}>
    <Ex08_Child01 />
</GlobalContext.Provider>

// Child01 - useContext로 값 소비
const {list, setList, btnClick01} = useContext(GlobalContext);

// Child03 - 중간 Child02를 건너뛰고 바로 소비 (prop drilling 없음)
const {btnClick02} = useContext(GlobalContext);`,
  },
};
