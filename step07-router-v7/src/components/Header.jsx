import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 64px;
    background: linear-gradient(135deg, #FFF7E3 0%, #FFF7E3 100%);
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: #4a2800;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 0.5px;

    span.icon {
        font-size: 24px;
    }

    span.brand {
        opacity: 0.95;
    }

    span.version {
        font-size: 11px;
        font-weight: 500;
        background: rgba(0,0,0,0.12);
        padding: 2px 8px;
        border-radius: 20px;
        letter-spacing: 1px;
    }
`;

const NavWrapper = styled.nav`
    display: flex;
    gap: 6px;
    background: rgba(255,255,255,0.15);
    padding: 6px;
    border-radius: 14px;
    backdrop-filter: blur(4px);
`;

const NavButton = styled.button`
    padding: 8px 20px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: rgba(74, 40, 0, 0.85);
    background: transparent;
    transition: all 0.2s ease;
    letter-spacing: 0.3px;

    &:hover {
        background: rgba(0,0,0,0.12);
        color: #4a2800;
        transform: translateY(-1px);
    }

    &.active {
        background: #4a2800;
        color: #FFF7E3;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
`;

export default function Header() {
    const nav = useNavigate();
    const location = useLocation();

    const homeBtn = () => nav('/');
    const userBtn = () => nav('/user/100');
    const adminBtn = () => nav('/admin?name=홍길동');

    return (
        <HeaderWrapper>
            <Logo>
                <span className="icon">🌱</span>
                <span className="brand">React Router</span>
                <span className="version">v7</span>
            </Logo>
            <NavWrapper>
                <NavButton className={location.pathname === '/' ? 'active' : ''} onClick={homeBtn}>🏠 Home</NavButton>
                <NavButton className={location.pathname.startsWith('/user') ? 'active' : ''} onClick={userBtn}>👤 User</NavButton>
                <NavButton className={location.pathname.startsWith('/admin') ? 'active' : ''} onClick={adminBtn}>🛡️ Admin</NavButton>
            </NavWrapper>
        </HeaderWrapper>
    );
}
