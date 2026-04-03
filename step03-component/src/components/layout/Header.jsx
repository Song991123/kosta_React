import styled from "styled-components";

const Nav = styled.header`
  background: white;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
  gap: 12px;
`;

const LogoSub = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #c9a0c9;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const LogoTitle = styled.h1`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #4a3f5c;
`;

const NavButtons = styled.nav`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const NavBtn = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${(props) => (props.$active ? "#e8b4d8" : "#f5eff9")};
  color: ${(props) => (props.$active ? "#6b3a6b" : "#a080a0")};
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e8b4d8;
    color: #6b3a6b;
  }
`;

const menus = [
  "HelloCard", "Calculator", "Dice", "Library",
  "IconButtons", "EmotionToast", "EmotionSelector", "SpreadObj",
];

export default function Header({ current, onSelect }) {
  return (
    <Nav>
      <div>
        <LogoSub>React Study</LogoSub>
        <LogoTitle>Component Gallery</LogoTitle>
      </div>
      <NavButtons>
        {menus.map((menu) => (
          <NavBtn key={menu} $active={current === menu} onClick={() => onSelect(menu)}>
            {menu}
          </NavBtn>
        ))}
      </NavButtons>
    </Nav>
  );
}
