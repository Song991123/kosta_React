import styled from "styled-components";

const Foot = styled.footer`
  text-align: center;
  padding: 20px;
  color: #c0a8c8;
  font-size: 0.78rem;
  letter-spacing: 0.5px;
`;

export default function Footer() {
  return <Foot>Component Gallery · header / body / footer 컴포넌트 분리 예제</Foot>;
}
