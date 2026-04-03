import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { IconButton } from "./IconButtons";
import emotion1 from "../../assets/emotion1.png";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  background: white;
  border-radius: 20px;
  padding: 48px 64px;
  box-shadow: 0 8px 32px rgba(180, 140, 200, 0.15);
`;

const Title = styled.h2`
  margin: 0;
  color: #4a3f5c;
  font-size: 1.2rem;
  font-weight: 800;
`;

const Desc = styled.p`
  margin: -20px 0 0;
  color: #a080a0;
  font-size: 0.85rem;
`;

const Toast = styled.div`
  padding: 14px 32px;
  background: linear-gradient(135deg, #fce8f3, #ede8fb);
  border-radius: 40px;
  color: #7a4a8a;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(180, 140, 200, 0.25);
  animation: ${(props) => (props.$fading ? fadeOut : fadeInUp)} 0.3s ease forwards;
`;

export default function EmotionToast() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);

  function handleClick() {
    if (show) return; // 이미 표시 중이면 무시
    setShow(true);
    setFading(false);

    // 0.7초 후 fadeOut 시작
    setTimeout(() => setFading(true), 700);
    // 1초 후 완전히 제거
    setTimeout(() => setShow(false), 1000);
  }

  return (
    <Wrapper>
      <Title>Emotion Button</Title>
      <Desc>IconButton 재활용 — onClick prop 사용</Desc>
      <IconButton icon={emotion1} label="Emotion" onClick={handleClick} />
      {show && <Toast $fading={fading}>즐거운 하루되세요</Toast>}
    </Wrapper>
  );
}
