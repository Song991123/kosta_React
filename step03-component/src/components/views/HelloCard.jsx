export default function HelloCard({ name }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "20px",
      padding: "40px 56px",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(180,140,200,0.15)",
    }}>
      <div style={{ fontSize: "3rem", marginBottom: "12px" }}>👋</div>
      <h2 style={{ margin: "0 0 8px", color: "#4a3f5c", fontSize: "1.6rem", fontWeight: 800 }}>
        안녕하세요!
      </h2>
      <p style={{ margin: 0, color: "#a080a0", fontSize: "1rem" }}>
        저는 <strong style={{ color: "#b06ab3" }}>{name}</strong> 입니다.
      </p>
    </div>
  );
}
