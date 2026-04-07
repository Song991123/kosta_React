import { useEffect, useRef, useState } from 'react';
import { useConsoleLogs } from '../context/ConsoleContext';

export default function ConsolePanel() {
    const { logs, clearLogs } = useConsoleLogs();
    const bottomRef = useRef();
    const [ctxMenu, setCtxMenu] = useState(null); // { x, y }

    // 새 로그 추가 시 자동 스크롤
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setCtxMenu({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => setCtxMenu(null);

    useEffect(() => {
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div
            onContextMenu={handleContextMenu}
            style={{
                margin: '0 32px 32px',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                fontFamily: "'Fira Code', 'Consolas', monospace",
            }}
        >
            {/* 상단 바 */}
            <div style={{
                background: '#1e1e2e',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #313244',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#6c7086', fontSize: '0.78rem' }}>Console</span>
                    <span style={{
                        background: '#313244', color: '#cba6f7',
                        fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px',
                    }}>{logs.length}</span>
                </div>
                <button onClick={clearLogs} style={{
                    background: 'none', border: '1px solid #45475a',
                    borderRadius: '6px', color: '#6c7086',
                    fontSize: '0.75rem', padding: '3px 10px',
                    cursor: 'pointer', transition: 'all 0.2s',
                }}
                    onMouseEnter={e => { e.target.style.color = '#cdd6f4'; e.target.style.borderColor = '#cdd6f4'; }}
                    onMouseLeave={e => { e.target.style.color = '#6c7086'; e.target.style.borderColor = '#45475a'; }}
                >
                    🗑 Clear
                </button>
            </div>

            {/* 우클릭 컨텍스트 메뉴 */}
        {ctxMenu && (
            <div style={{
                position: 'fixed', top: ctxMenu.y, left: ctxMenu.x,
                background: '#313244', borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                padding: '4px', zIndex: 9999, minWidth: '120px',
            }}>
                <button onClick={clearLogs} style={{
                    display: 'block', width: '100%', background: 'none',
                    border: 'none', color: '#cdd6f4', fontSize: '0.82rem',
                    padding: '8px 14px', cursor: 'pointer', borderRadius: '6px',
                    textAlign: 'left',
                }}
                    onMouseEnter={e => e.target.style.background = '#45475a'}
                    onMouseLeave={e => e.target.style.background = 'none'}
                >
                    🗑 Clear console
                </button>
            </div>
        )}

        {/* 로그 영역 */}
            <div style={{
                background: '#181825',
                height: '180px',
                overflowY: 'auto',
                padding: '10px 16px',
            }}>
                {logs.length === 0 ? (
                    <span style={{ color: '#45475a', fontSize: '0.8rem' }}>// 로그가 없습니다</span>
                ) : (
                    logs.map((log) => (
                        <div key={log.id} style={{
                            display: 'flex', gap: '12px',
                            padding: '2px 0', borderBottom: '1px solid #1e1e2e',
                        }}>
                            <span style={{ color: '#45475a', fontSize: '0.75rem', flexShrink: 0, paddingTop: '1px' }}>
                                {log.time}
                            </span>
                            <span style={{ color: '#a6e3a1', fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {log.message}
                            </span>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
