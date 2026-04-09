import { useState, useEffect, use } from "react";
import styled from "styled-components";

function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function printAdd(a, b) {
  const result = add(a, b);
  return `result = ${result}`;
}

function printMinus(a, b) {
  const result = minus(a, b);
  return `result = ${result}`;
}

function print(a, b, cb) {
  const result = cb(a, b);
  return `result = ${result}`;
}



const codeSample = `function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function printAdd(a, b) {
  const result = add(a, b);
  return \`result = \${result}\`;
}

function printMinus(a, b) {
  const result = minus(a, b);
  return \`result = \${result}\`;
}

function print(a, b, cb) {
  const result = cb(a, b);
  return \`result = \${result}\`;
}

new Promise((resolve) => {
  setTimeout(() => {
    resolve("This is a resolved value after 3 seconds.");
  }, 3000);
}).then((value) => console.log(value));

async function fetchData() {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a resolved value after 3 seconds.");
    }
  });
  console.log(result);
}
  
fetchData();

`;



const staticLogs = [
  { label: "printAdd(5, 3)", value: printAdd(5, 3) },
  { label: "printMinus(5, 3)", value: printMinus(5, 3) },
  { label: "print(5, 3, add)", value: print(5, 3, add) },
  { label: "print(5, 3, minus)", value: print(5, 3, minus) },
  { label: "print(5, 3, (a, b) => a * b)", value: print(5, 3, (a, b) => a * b) },
  { label: "print(5, 3, (a, b) => a / b)", value: print(5, 3, (a, b) => a / b) },
];

function App() {
  const [promiseResult, setPromiseResult] = useState("⏳ 3초 후 결과가 표시됩니다...");
  const [asyncResult, setAsyncResult] = useState("⏳ 3초 후 결과가 표시됩니다...");

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a resolved value after 3 seconds.");
      }, 3000);
    }).then((value) => setPromiseResult(value));
  }, []);

  useEffect(() => {
    // async/await 버전
    async function fetchData() {
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve("This is a resolved value after 3 seconds.");
        }, 3000);
      });
      setAsyncResult(result);
    }
    fetchData();
  }, []);

  const logs = [
    ...staticLogs,
    { label: "Promise (.then) Example (3s delay)", value: promiseResult },
    { label: "async/await Example (3s delay)", value: asyncResult },
  ];

  return (
    <Page>
      <HeroCard>
        <Eyebrow>Asynchronous Test</Eyebrow>
        <Title>콘솔 대신 화면에서 코드와 결과를 바로 확인해보세요.</Title>
        <Description>
          기존 계산 함수는 유지하고, 출력만 화면으로 옮겨서 디버깅하기 쉽게
          정리했습니다.
        </Description>
      </HeroCard>

      <Grid>
        <Panel>
          <PanelTitle>실행 코드</PanelTitle>
          <CodeBlock>{codeSample}</CodeBlock>
        </Panel>

        <Panel>
          <PanelTitle>실행 결과</PanelTitle>
          <ResultList>
            {logs.map((log) => (
              <ResultItem key={log.label}>
                <ResultLabel>{log.label}</ResultLabel>
                <ResultValue>{log.value}</ResultValue>
              </ResultItem>
            ))}
          </ResultList>
        </Panel>
      </Grid>
    </Page>
  );
}

export default App;

const Page = styled.main`
  min-height: 100vh;
  padding: clamp(20px, 3vw, 40px);
  background:
    radial-gradient(circle at top, rgba(255, 210, 160, 0.35), transparent 30%),
    linear-gradient(135deg, #f7f1e8 0%, #f3efe8 45%, #e6ecf5 100%);
  color: #1f2937;
`;

const HeroCard = styled.section`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto 24px;
  padding: 32px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
`;

const Eyebrow = styled.p`
  margin: 0 0 10px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b45309;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
`;

const Description = styled.p`
  max-width: 720px;
  margin: 14px 0 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #475569;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(340px, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.article`
  padding: 24px;
  min-width: 0;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.08);
`;

const PanelTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 1.1rem;
`;

const CodeBlock = styled.pre`
  overflow-x: auto;
  margin: 0;
  min-height: 520px;
  padding: 24px;
  border-radius: 18px;
  background: #111827;
  color: #f8fafc;
  font-size: 1rem;
  line-height: 1.7;
`;

const ResultList = styled.ul`
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ResultItem = styled.li`
  padding: 16px 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, #fff7ed 0%, #eff6ff 100%);
  border: 1px solid rgba(148, 163, 184, 0.18);
`;

const ResultLabel = styled.p`
  margin: 0 0 8px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.9rem;
  color: #334155;
`;

const ResultValue = styled.p`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
`;
