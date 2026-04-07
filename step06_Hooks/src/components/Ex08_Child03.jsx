import React from "react";
import { useContext } from "react";
import { GlobalContext } from "./Ex08_Context";
import '../styles/ex.css';

export default function Ex08_Child03() {
    const {btnClick02} = useContext(GlobalContext);
    return <div className="ex-wrap" style={{ background: '#fff6f0', borderRadius: '10px', padding: '14px' }}>
        <h3>Child 03</h3>
        <button className="ex-btn" onClick={btnClick02}>클릭</button>
    </div>;
}
