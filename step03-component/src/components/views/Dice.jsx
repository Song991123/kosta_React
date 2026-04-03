// named export 예제 — 관련 컴포넌트 여러 개를 한 파일에 묶기
import { useState } from "react";

const LAYOUTS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

export function DiceFace({ value }) {
  const activeCells = new Set(LAYOUTS[value]);
  return (
    <div style={{
      width: "96px",
      height: "96px",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 16px rgba(180,140,200,0.2)",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      padding: "14px",
      gap: "4px",
      border: "2px solid #f0e0f5",
    }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {activeCells.has(i) && (
            <div style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#b06ab3",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

export function RollButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: "20px",
        padding: "10px 32px",
        background: "#e8b4d8",
        color: "#6b3a6b",
        border: "none",
        borderRadius: "20px",
        fontSize: "0.95rem",
        fontWeight: "700",
        cursor: "pointer",
      }}
    >
      굴리기
    </button>
  );
}

export default function Dice() {
  const [value, setValue] = useState(1);

  function roll() {
    setValue(Math.floor(Math.random() * 6) + 1);
  }

  return (
    <div style={{
      background: "white",
      borderRadius: "20px",
      padding: "36px 48px",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(180,140,200,0.15)",
    }}>
      <p style={{ margin: "0 0 20px", fontWeight: 800, color: "#4a3f5c", fontSize: "1.1rem" }}>
        주사위
      </p>
      <DiceFace value={value} />
      <RollButton onClick={roll} />
    </div>
  );
}
