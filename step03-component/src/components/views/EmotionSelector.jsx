import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { IconButton } from "./IconButtons";

import emotion1 from "../../assets/emotion1.png";
import emotion2 from "../../assets/emotion2.png";
import emotion3 from "../../assets/emotion3.png";
import emotion4 from "../../assets/emotion4.png";
import emotion5 from "../../assets/emotion5.png";

// ── 감정 객체 배열 — 버튼 클릭 시 선택된 객체 전체를 state에 저장
const emotions = [
  { id: 1, img: emotion1, name: "기쁨",   desc: "오늘 하루도 즐겁게 보내세요!",   accent: "#f9d0e2", text: "#a0406a" },
  { id: 2, img: emotion2, name: "슬픔",   desc: "가끔은 울어도 괜찮아요.",         accent: "#cce0f9", text: "#3060a0" },
  { id: 3, img: emotion3, name: "화남",   desc: "심호흡 한 번 해볼까요?",          accent: "#f9d8cc", text: "#a04020" },
  { id: 4, img: emotion4, name: "놀람",   desc: "세상엔 신기한 일이 많아요!",      accent: "#fff0c2", text: "#907020" },
  { id: 5, img: emotion5, name: "평온",   desc: "잔잔한 하루가 되길 바랍니다.",    accent: "#d0f0e0", text: "#207050" },
];

// ── 스타일
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  background: white;
  border-radius: 20px;
  padding: 40px 48px;
  box-shadow: 0 8px 32px rgba(180, 140, 200, 0.15);
  min-width: 420px;
`;

const Title = styled.h2`
  margin: 0;
  color: #4a3f5c;
  font-size: 1.2rem;
  font-weight: 800;
`;

const Desc = styled.p`
  margin: -16px 0 0;
  color: #a080a0;
  font-size: 0.85rem;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 14px;
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
`;

// 선택된 감정 객체의 accent 색으로 카드 배경이 바뀜
const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: ${(props) => props.$accent};
  border-radius: 16px;
  padding: 20px 28px;
  width: 100%;
  animation: ${popIn} 0.25s ease;
`;

const CardImg = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
`;

const CardName = styled.p`
  margin: 0 0 4px;
  font-size: 1.2rem;
  font-weight: 800;
  color: ${(props) => props.$text};
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: ${(props) => props.$text};
  opacity: 0.85;
`;

const Placeholder = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 20px;
  background: #f9f5fc;
  color: #c0a8c8;
  font-size: 0.88rem;
  text-align: center;
`;

export default function EmotionSelector() {
  // 선택된 감정 객체 전체를 state로 관리
  const [selected, setSelected] = useState(null);

  return (
    <Wrapper>
      <Title>Emotion Selector</Title>
      <Desc>버튼 클릭 → 객체 전체를 state에 저장</Desc>

      <BtnRow>
        {emotions.map((emotion) => (
          <IconButton
            key={emotion.id}
            icon={emotion.img}
            label={emotion.name}
            onClick={() => setSelected(emotion)}  // 객체 통째로 전달
          />
        ))}
      </BtnRow>

      {/* 선택된 객체의 프로퍼티를 구조 분해해서 렌더링 */}
      {selected ? (
        <Card key={selected.id} $accent={selected.accent}>
          <CardImg src={selected.img} alt={selected.name} />
          <div>
            <CardName $text={selected.text}>{selected.name}</CardName>
            <CardDesc $text={selected.text}>{selected.desc}</CardDesc>
          </div>
        </Card>
      ) : (
        <Placeholder>감정 버튼을 눌러보세요</Placeholder>
      )}
    </Wrapper>
  );
}
