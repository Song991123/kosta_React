import { useState } from "react";
import styled, { keyframes } from "styled-components";

const baseProfile = {
  name: "홍길동",
  age: 20,
  job: "학생",
  city: "서울",
};

// 버튼마다 base 객체에서 일부 프로퍼티만 덮어씌움
const overrides = [
  { label: "기본",      changes: {} },
  { label: "나이 변경", changes: { age: 25 } },
  { label: "직업 변경", changes: { job: "개발자" } },
  { label: "도시 변경", changes: { city: "부산" } },
  { label: "전부 변경", changes: { age: 30, job: "디자이너", city: "제주" } },
];

const Wrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 48px;
  box-shadow: 0 8px 32px rgba(180, 140, 200, 0.15);
  min-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 28px;
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
  gap: 10px;
  flex-wrap: wrap;
`;

const Btn = styled.button`
  padding: 9px 18px;
  border: none;
  border-radius: 20px;
  background: ${(props) => (props.$active ? "#e8b4d8" : "#f5eff9")};
  color: ${(props) => (props.$active ? "#6b3a6b" : "#a080a0")};
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  background: #fdf8ff;
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${popIn} 0.2s ease;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const Key = styled.span`
  color: #a080a0;
  font-weight: 600;
`;

const Value = styled.span`
  color: ${(props) => (props.$changed ? "#b06ab3" : "#4a3f5c")};
  font-weight: 700;
`;

const CodeBox = styled.pre`
  background: #f5eff9;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 0.78rem;
  color: #7a5a8a;
  margin: 0;
  line-height: 1.7;
  overflow: auto;
`;

export default function SpreadObj() {
  const [activeIdx, setActiveIdx] = useState(0);

  const { changes } = overrides[activeIdx];
  // 스프레드로 base 복제 + 선택된 변경사항 덮어쓰기
  const profile = { ...baseProfile, ...changes };

  const changedKeys = Object.keys(changes);
  const spreadCode = changedKeys.length === 0
    ? `{ ...baseProfile }`
    : `{ ...baseProfile, ${Object.entries(changes).map(([k, v]) => `${k}: "${v}"`).join(", ")} }`;

  return (
    <Wrapper>
      <Title>Spread Object</Title>
      <Desc>base 객체는 그대로 — 스프레드로 복제 후 일부만 덮어쓰기</Desc>

      <BtnRow>
        {overrides.map((o, i) => (
          <Btn key={i} $active={activeIdx === i} onClick={() => setActiveIdx(i)}>
            {o.label}
          </Btn>
        ))}
      </BtnRow>

      <Card key={activeIdx}>
        {Object.entries(profile).map(([k, v]) => (
          <Row key={k}>
            <Key>{k}</Key>
            <Value $changed={changedKeys.includes(k)}>{v}</Value>
          </Row>
        ))}
      </Card>

      <CodeBox>{`const profile = ${spreadCode}`}</CodeBox>
    </Wrapper>
  );
}
