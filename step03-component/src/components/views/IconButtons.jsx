import styled from "styled-components";
import mailImg     from "../../assets/mail.png";
import locationImg from "../../assets/location.png";
import searchImg   from "../../assets/search.png";

// ── IconButton: href(링크) 또는 onClick(버튼) 중 하나를 props로 받는 공통 컴포넌트
const Btn = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 20px;
  background: white;
  border-radius: 16px;
  text-decoration: none;
  border: none;
  box-shadow: 0 4px 16px rgba(180, 140, 200, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(180, 140, 200, 0.25);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const Label = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: #7a5a8a;
  letter-spacing: 0.3px;
`;

// href가 있으면 링크(<a>), onClick이 있으면 버튼(<button>)으로 렌더
export function IconButton({ icon, label, href, onClick }) {
  const props = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { as: "button", onClick };
  return (
    <Btn {...props}>
      <Icon src={icon} alt={label} />
      <Label>{label}</Label>
    </Btn>
  );
}

// ── 버튼 3개를 모아서 보여주는 뷰
const Wrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 36px 40px;
  box-shadow: 0 8px 32px rgba(180, 140, 200, 0.15);
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 8px;
  color: #4a3f5c;
  font-size: 1.2rem;
  font-weight: 800;
`;

const Desc = styled.p`
  margin: 0 0 28px;
  color: #a080a0;
  font-size: 0.85rem;
`;

const Grid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const buttons = [
  { icon: mailImg,     label: "Mail",     href: "https://mail.google.com" },
  { icon: locationImg, label: "Location", href: "https://maps.google.com" },
  { icon: searchImg,   label: "Search",   href: "https://google.com" },
];

export default function IconButtons() {
  return (
    <Wrapper>
      <Title>Icon Buttons</Title>
      <Desc>같은 컴포넌트, 다른 props — icon · label · href</Desc>
      <Grid>
        {buttons.map(({ icon, label, href }) => (
          <IconButton key={label} icon={icon} label={label} href={href} />
        ))}
      </Grid>
    </Wrapper>
  );
}
