import { useState } from "react";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Body   from "./components/layout/Body";
import Footer from "./components/layout/Footer";
import HelloCard       from "./components/views/HelloCard";
import Calculator      from "./components/views/Calculator";
import Dice            from "./components/views/Dice";
import Library         from "./components/views/Library";
import IconButtons     from "./components/views/IconButtons";
import EmotionToast    from "./components/views/EmotionToast";
import EmotionSelector from "./components/views/EmotionSelector";
import SpreadObj       from "./components/views/SpreadObj";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, #fce8f3 0%, #ede8fb 50%, #e8f0fb 100%);
`;

function renderView(view) {
  if (view === "Calculator")      return <Calculator />;
  if (view === "Dice")            return <Dice />;
  if (view === "Library")         return <Library />;
  if (view === "IconButtons")     return <IconButtons />;
  if (view === "EmotionToast")    return <EmotionToast />;
  if (view === "EmotionSelector") return <EmotionSelector />;
  if (view === "SpreadObj")       return <SpreadObj />;
  return <HelloCard name="송정현" />;
}

export default function App() {
  const [currentView, setCurrentView] = useState("HelloCard");

  return (
    <Page>
      <Header current={currentView} onSelect={setCurrentView} />
      <Body>{renderView(currentView)}</Body>
      <Footer />
    </Page>
  );
}
