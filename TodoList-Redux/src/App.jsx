import { } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  margin: 0 auto;
`;

function App() {
  // App은 레이아웃만 담당
  return (
    <AppWrapper>
      <Header />
      <Editor />
      <List />
    </AppWrapper>
  );
}

export default App;
