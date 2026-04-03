// named export 예제 — 관련 컴포넌트 여러 개를 한 파일에 묶기
import { useState } from "react";

export function CalcDisplay({ expression, value }) {
  return (
    <div style={{
      background: "#f9f0fb",
      borderRadius: "14px",
      padding: "12px 20px 16px",
      marginBottom: "16px",
      textAlign: "right",
    }}>
      <div style={{ color: "#c9a0c9", fontSize: "0.95rem", minHeight: "20px" }}>
        {expression}
      </div>
      <div style={{ color: "#4a3f5c", fontSize: "2.4rem", fontWeight: "700", wordBreak: "break-all" }}>
        {value}
      </div>
    </div>
  );
}

export function CalcButton({ label, onClick, variant = "number", active = false }) {
  const variants = {
    number:   { background: "#f5eff9", color: "#4a3f5c" },
    operator: { background: active ? "#b06ab3" : "#e8b4d8", color: active ? "white" : "#6b3a6b" },
    equal:    { background: "#b06ab3", color: "white" },
    clear:    { background: "#f4b8c8", color: "#7a3050" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: "12px",
        fontSize: "1.1rem",
        fontWeight: "600",
        padding: "18px",
        cursor: "pointer",
        transition: "filter 0.15s, transform 0.1s",
        ...variants[variant],
      }}
      onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.95)"}
      onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
      onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
      onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
    >
      {label}
    </button>
  );
}

const layout = [
  { label: "C",  variant: "clear"    },
  { label: "±",  variant: "operator" },
  { label: "%",  variant: "operator" },
  { label: "÷",  variant: "operator" },
  { label: "7",  variant: "number"   },
  { label: "8",  variant: "number"   },
  { label: "9",  variant: "number"   },
  { label: "×",  variant: "operator" },
  { label: "4",  variant: "number"   },
  { label: "5",  variant: "number"   },
  { label: "6",  variant: "number"   },
  { label: "−",  variant: "operator" },
  { label: "1",  variant: "number"   },
  { label: "2",  variant: "number"   },
  { label: "3",  variant: "number"   },
  { label: "+",  variant: "operator" },
  { label: "0",  variant: "number"   },
  { label: ".",  variant: "number"   },
  { label: "=",  variant: "equal"    },
];

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [reset, setReset] = useState(false);

  function handleClick(label) {
    if (!isNaN(label) || label === ".") {
      const next = reset || display === "0" ? label : display + label;
      setDisplay(next);
      setReset(false);
    } else if (label === "C") {
      setDisplay("0"); setPrev(null); setOp(null); setReset(false);
    } else if (label === "±") {
      setDisplay(String(parseFloat(display) * -1));
    } else if (label === "%") {
      setDisplay(String(parseFloat(display) / 100));
    } else if (label === "=") {
      if (op && prev !== null) {
        const a = parseFloat(prev), b = parseFloat(display);
        const result = op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a / b;
        setDisplay(String(parseFloat(result.toFixed(10))));
        setPrev(null); setOp(null); setReset(true);
      }
    } else {
      setPrev(display); setOp(label); setReset(true);
    }
  }

  const expression = op ? `${prev} ${op}` : "";

  return (
    <div style={{
      background: "white",
      borderRadius: "24px",
      padding: "28px",
      width: "320px",
      boxShadow: "0 8px 32px rgba(180,140,200,0.2)",
    }}>
      <CalcDisplay expression={expression} value={display} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {layout.map(({ label, variant }) => (
          <CalcButton
            key={label}
            label={label}
            variant={variant}
            active={variant === "operator" && op === label}
            onClick={() => handleClick(label)}
          />
        ))}
      </div>
    </div>
  );
}
