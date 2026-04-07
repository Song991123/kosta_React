import { useState } from 'react';

const cardStyle = {
    border: '1px solid #e5e5ea',
    borderRadius: '14px',
    overflow: 'hidden',
    background: 'white',
};

const sectionLabel = {
    fontSize: '0.7rem',
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#999',
    padding: '10px 18px 4px',
};

const demoArea = {
    padding: '20px 18px',
    borderBottom: '1px solid #f0f0f0',
};

const descArea = {
    padding: '12px 18px',
    background: '#fafafa',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '0.88rem',
    color: '#444',
    lineHeight: '1.6',
};

const codeToggleBtn = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 18px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#2e2640',
    width: '100%',
    textAlign: 'left',
};

const codeBlock = {
    margin: 0,
    padding: '16px 18px',
    background: '#1e1e2e',
    color: '#cdd6f4',
    fontSize: '0.78rem',
    lineHeight: '1.7',
    overflowX: 'auto',
    fontFamily: "'Fira Code', 'Consolas', monospace",
    whiteSpace: 'pre',
};

export default function ExCard({ title, description, code, children }) {
    const [showCode, setShowCode] = useState(false);

    return (
        <div style={cardStyle}>
            {/* 라이브 데모 */}
            <div style={sectionLabel}>Live Demo</div>
            <div style={demoArea}>{children}</div>

            {/* 설명 */}
            <div style={descArea}>💡 {description}</div>

            {/* 코드 토글 */}
            <button style={codeToggleBtn} onClick={() => setShowCode(!showCode)}>
                <span>{showCode ? '▾' : '▸'}</span>
                <span>소스 코드 보기</span>
            </button>
            {showCode && (
                <pre style={codeBlock}><code>{code}</code></pre>
            )}
        </div>
    );
}
