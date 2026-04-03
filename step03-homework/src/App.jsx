import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Product  from './components/views/Product';
import TripTest from './components/views/TripTest';

const SIDEBAR_OPEN  = '200px';
const SIDEBAR_CLOSE = '48px';

const linkStyle = {
  color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
  fontWeight: 700, fontSize: '0.88rem',
  padding: '10px 16px', borderRadius: '10px',
  width: '168px', display: 'block',
};

const activeLinkStyle = {
  ...linkStyle,
  background: 'rgba(255,255,255,0.15)', color: 'white',
};

function App() {
  const [open, setOpen] = useState(true);
  const sidebarWidth = open ? SIDEBAR_OPEN : SIDEBAR_CLOSE;

  return (
    <div style={{ paddingLeft: sidebarWidth, transition: 'padding 0.3s' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0,
        height: '100vh', width: sidebarWidth,
        background: '#2e2640', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s',
      }}>

        {/* 햄버거 토글 */}
        <button onClick={() => setOpen(!open)} style={{
          alignSelf: 'flex-end', margin: '14px 12px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px', flexShrink: 0,
        }}>
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'rgba(255,255,255,0.7)' }} />
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'rgba(255,255,255,0.7)' }} />
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'rgba(255,255,255,0.7)' }} />
        </button>

        {open && (
          <>
            {/* 프로필 */}
            <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a0c9, #8a6abf)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', fontWeight: 800, color: 'white', marginBottom: '12px',
              }}>송</div>
              <p style={{ margin: 0, color: 'white', fontWeight: 800, fontSize: '0.95rem' }}>송정현</p>
              <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>26.04.03</p>
            </div>

            {/* 태그 */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{
                background: 'rgba(201,160,201,0.25)', color: '#d4aad4',
                fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px',
                borderRadius: '20px', letterSpacing: '0.5px',
              }}>React 과제</span>
            </div>

            {/* 메뉴 */}
            <div style={{ padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <p style={{ margin: '0 0 8px 4px', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Pages</p>
              <NavLink to="/"       end style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>TripTest</NavLink>
              <NavLink to="/product"    style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>Product</NavLink>
            </div>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/"        element={<TripTest />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
