import React from "react";
import Ex08_Child03 from "./Ex08_Child03";
import '../styles/ex.css';

export default function Ex08_Child02() {
    return <div className="ex-wrap" style={{ background: '#f0f4ff', borderRadius: '10px', padding: '14px' }}>
        <h3>Child 02</h3>
        <Ex08_Child03 />
    </div>;
}
