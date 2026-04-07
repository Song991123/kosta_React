import React from "react";
import { createContext } from "react";
import { useConsoleLog } from '../context/ConsoleContext';
import Ex08_Child01 from "./Ex08_Child01";
import '../styles/ex.css';

// Context API : 컴포넌트 트리 전체에 데이터를 공급할 수 있는 방법을 제공하는 React의 기능.
export const GlobalContext = createContext();

export default function Ex08_Context() {
    const log = useConsoleLog();
    const [list, setList] = React.useState([
        { id: 1, name: '홍길동' },
        { id: 2, name: '김철수' },
        { id: 3, name: '이영희' },
    ]);

    const btnClick01 = () => {
        log('버튼 01 클릭');
    }

    const btnClick02 = () => {
        log('버튼 02 클릭');
    }

    return(
        // value에 객체로 전달하는 이유 = 여러 개의 값을 전달하기 위해서. (list, setList, btnClick01, btnClick02)
        <GlobalContext.Provider value={{list, setList, btnClick01, btnClick02}}>
            <div className="ex-wrap">
                <h3>user 정보</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {list.map((user, index) => (
                        <div key={index} className="ex-user-row">
                            <span style={{ color: '#888', fontSize: '0.8rem' }}>{user.id}</span>
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                <Ex08_Child01 />
            </div>
        </GlobalContext.Provider>
    );
}
