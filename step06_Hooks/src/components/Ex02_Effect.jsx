import { useState } from 'react';
import Ex02_Timer from "./Ex02_Timer";
import '../styles/ex.css';

export function Ex02_Effect() {
    const [state, setState] = useState(0);
    return (
        <div className="ex-wrap">
            <h3>Effect - 자원 정리</h3>
            {state && <Ex02_Timer />}
            <button className="ex-btn" onClick={() => setState(!state)}>Toggle Button</button>
        </div>
    );
}

export default Ex02_Effect;
