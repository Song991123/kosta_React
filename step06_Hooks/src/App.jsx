import { useState } from 'react';
import './App.css'
import Ex02_Effect from './components/Ex02_Effect';
import Ex03_Memo from './components/Ex03_Memo';
import Ex04_Ref from './components/Ex04_Ref';
import Ex04_RefSave from './components/Ex04_RefSave';
import Ex04_ReRenderer from './components/Ex04_ReRenderer';
import Ex04_RenderCount from './components/Ex04_RenderCount';
import CommentList from './comments/CommentList';
import Ex08_Context from './components/Ex08_Context';
import ExCard from './components/ExCard';
import ConsolePanel from './components/ConsolePanel';
import { ConsoleProvider } from './context/ConsoleContext';
import { exData } from './data/exCodes';

const TABS = [
  { key: 'Ex02_Effect',      component: <Ex02_Effect /> },
  { key: 'Ex03_Memo',        component: <Ex03_Memo /> },
  { key: 'Ex04_Ref',         component: <Ex04_Ref /> },
  { key: 'Ex04_RefSave',     component: <Ex04_RefSave /> },
  { key: 'Ex04_ReRenderer',  component: <Ex04_ReRenderer /> },
  { key: 'Ex04_RenderCount', component: <Ex04_RenderCount /> },
  { key: 'CommentList', component: <CommentList /> },
  { key: 'Ex08_Context', component: <Ex08_Context /> },
];

function App() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const data = exData[tab.key];

  return (
    <ConsoleProvider>
      <div style={{ minHeight: '100vh', background: '#f4f4f8', fontFamily: 'sans-serif' }}>
        {/* 헤더 */}
        <div style={{ background: '#2e2640', padding: '20px 32px' }}>
          <h1 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>⚛️ React Hooks</h1>
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', gap: '8px', padding: '20px 32px', flexWrap: 'wrap' }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '0.85rem',
              background: active === i ? '#2e2640' : 'white',
              color: active === i ? 'white' : '#555',
              boxShadow: active === i ? '0 2px 8px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
            }}>
              {exData[t.key].title}
            </button>
          ))}
        </div>

        {/* 컨텐츠 */}
        <div style={{ margin: '0 32px 20px' }}>
          <ExCard
            title={data.title}
            description={data.description}
            code={data.code}
          >
            {tab.component}
          </ExCard>
        </div>

        {/* 웹 콘솔 패널 */}
        <ConsolePanel />
      </div>
    </ConsoleProvider>
  );
}

export default App
