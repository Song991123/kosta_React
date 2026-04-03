import styled from "styled-components";

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
`;

export default function Body({ children }) {
  return <Main>{children}</Main>;
}
