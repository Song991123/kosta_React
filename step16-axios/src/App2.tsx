/**
 * App2.tsx — json-server를 이용한 axios CRUD 테스트 컴포넌트
 *
 * 실행 방법:
 *   npm run start
 *   → concurrently 가 아래 두 서버를 동시에 실행합니다.
 *     ① Vite 개발 서버  : http://localhost:5173  (React 화면)
 *     ② json-server     : http://localhost:3001  (가짜 REST API)
 *
 * json-server란?
 *   db.json 파일을 읽어 자동으로 REST API를 만들어주는 도구입니다.
 *   실제 Spring Boot 서버가 없어도 CRUD를 테스트할 수 있습니다.
 *
 * API 엔드포인트 (baseURL = http://localhost:3001):
 *   GET    /users      → 전체 조회
 *   GET    /users/:id  → 단건 조회
 *   POST   /users      → 등록
 *   PUT    /users/:id  → 전체 수정
 *   DELETE /users/:id  → 삭제
 */

import { useState } from "react";
import "./App.css";
import axiosInstance from "./api/axiosInstance";

// 사용자 데이터 타입 정의
interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
}

function App2() {
  // 서버에서 받아온 결과를 저장하는 상태
  const [users, setUsers] = useState<User[]>([]);

  // 마지막으로 실행한 요청 정보를 저장 (화면 설명용)
  const [lastAction, setLastAction] = useState<string>("");

  // ──────────────────────────────────────────────
  // GET /users — 전체 조회
  // ──────────────────────────────────────────────
  const getUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      // res.data 가 배열로 반환됨
      setUsers(res.data);
      setLastAction("GET /users → 전체 사용자 조회");
    } catch (error) {
      console.error("전체 조회 실패:", error);
    }
  };

  // ──────────────────────────────────────────────
  // GET /users/1 — 단건 조회 (id=1 고정 예시)
  // ──────────────────────────────────────────────
  const getUserById = async () => {
    try {
      const res = await axiosInstance.get("/users/1");
      // 단건이므로 배열로 감싸서 동일한 목록 UI에 표시
      setUsers([res.data]);
      setLastAction("GET /users/1 → id=1 사용자 단건 조회");
    } catch (error) {
      console.error("단건 조회 실패:", error);
    }
  };

  // ──────────────────────────────────────────────
  // POST /users — 새 사용자 등록
  // json-server 가 id를 자동 생성해 줍니다.
  // ──────────────────────────────────────────────
  const addUser = async () => {
    const newUser: User = {
      name: "Daisy",
      username: "daisy04",
      email: "daisy@example.com",
    };
    try {
      const res = await axiosInstance.post("/users", newUser);
      setUsers([res.data]); // 등록된 항목만 표시 (자동 생성된 id 확인용)
      setLastAction(`POST /users → 새 사용자 등록 (id=${res.data.id} 자동 생성)`);
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  // ──────────────────────────────────────────────
  // PUT /users/1 — 전체 수정 (id=1 고정 예시)
  // PUT 은 해당 객체 전체를 덮어씁니다.
  // ──────────────────────────────────────────────
  const updateUser = async () => {
    const updatedUser: User = {
      name: "Alice Updated",
      username: "alice_new",
      email: "alice_new@example.com",
    };
    try {
      const res = await axiosInstance.put("/users/1", updatedUser);
      setUsers([res.data]);
      setLastAction("PUT /users/1 → id=1 사용자 전체 수정");
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  // ──────────────────────────────────────────────
  // DELETE /users/2 — 삭제 (id=2 고정 예시)
  // ──────────────────────────────────────────────
  const deleteUser = async () => {
    try {
      await axiosInstance.delete("/users/2");
      setUsers([]); // 삭제 후 결과창 초기화
      setLastAction("DELETE /users/2 → id=2 사용자 삭제 완료 (db.json에서도 제거됨)");
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div style={styles.page}>

      {/* ── 헤더 설명 ── */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🔌 Axios + json-server CRUD 테스트</h1>
        <p style={styles.desc}>
          <strong>json-server</strong>는 <code>db.json</code> 파일 하나로
          REST API를 자동 생성해주는 도구입니다.
          <br />
          실제 Spring Boot 없이도 axios CRUD를 그대로 연습할 수 있습니다.
        </p>

        {/* 서버 구조 시각화 */}
        <div style={styles.diagram}>
          <span style={styles.box}>React (Vite)<br /><code>:5173</code></span>
          <span style={styles.arrow}>axios 요청 →</span>
          <span style={styles.box}>json-server<br /><code>:3001</code></span>
          <span style={styles.arrow}>읽기/쓰기 →</span>
          <span style={styles.box}>db.json<br />(가짜 DB)</span>
        </div>
      </div>

      {/* ── API 설명표 ── */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>📋 사용 가능한 엔드포인트</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>메서드</th>
              <th style={styles.th}>URL</th>
              <th style={styles.th}>설명</th>
            </tr>
          </thead>
          <tbody>
            {[
              { method: "GET",    color: "#22c55e", url: "/users",    desc: "전체 조회" },
              { method: "GET",    color: "#22c55e", url: "/users/1",  desc: "단건 조회" },
              { method: "POST",   color: "#3b82f6", url: "/users",    desc: "새 항목 등록" },
              { method: "PUT",    color: "#f59e0b", url: "/users/1",  desc: "전체 수정" },
              { method: "DELETE", color: "#ef4444", url: "/users/2",  desc: "삭제" },
            ].map((row) => (
              <tr key={row.url + row.method} style={styles.tr}>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, background: row.color }}>
                    {row.method}
                  </span>
                </td>
                <td style={{ ...styles.td, fontFamily: "monospace" }}>{row.url}</td>
                <td style={styles.td}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── 버튼 영역 ── */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>🧪 직접 실행해보기</h2>
        <div style={styles.btnRow}>
          <button style={{ ...styles.btn, background: "#22c55e" }} onClick={getUsers}>
            GET 전체 조회
          </button>
          <button style={{ ...styles.btn, background: "#22c55e" }} onClick={getUserById}>
            GET 단건 조회 (id=1)
          </button>
          <button style={{ ...styles.btn, background: "#3b82f6" }} onClick={addUser}>
            POST 등록
          </button>
          <button style={{ ...styles.btn, background: "#f59e0b" }} onClick={updateUser}>
            PUT 수정 (id=1)
          </button>
          <button style={{ ...styles.btn, background: "#ef4444" }} onClick={deleteUser}>
            DELETE 삭제 (id=2)
          </button>
        </div>
      </div>

      {/* ── 결과 영역 ── */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>📦 결과</h2>
        {lastAction && (
          <p style={styles.actionLabel}>✅ 마지막 요청: <strong>{lastAction}</strong></p>
        )}
        {users.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>name</th>
                <th style={styles.th}>username</th>
                <th style={styles.th}>email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.username}</td>
                  <td style={styles.td}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: "#94a3b8" }}>
            버튼을 눌러 결과를 확인해보세요.
          </p>
        )}
      </div>

    </div>
  );
}

export default App2;

// ── 인라인 스타일 (styled-components 없이 간단하게) ──
const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "sans-serif",
    color: "#1e293b",
  },
  hero: {
    background: "linear-gradient(135deg, #eff6ff, #f0fdf4)",
    border: "1px solid #bfdbfe",
    borderRadius: 16,
    padding: "28px 32px",
    marginBottom: 24,
  },
  title: { margin: "0 0 12px", fontSize: "1.8rem" },
  desc:  { margin: "0 0 20px", lineHeight: 1.8, color: "#475569" },
  diagram: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  box: {
    background: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    padding: "10px 18px",
    textAlign: "center",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  arrow: { color: "#64748b", fontSize: "0.9rem" },
  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: "24px 28px",
    marginBottom: 24,
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
  sectionTitle: { margin: "0 0 16px", fontSize: "1.1rem" },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#f8fafc" },
  th: {
    padding: "10px 14px",
    textAlign: "left",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "0.85rem",
    color: "#64748b",
  },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "10px 14px", fontSize: "0.95rem" },
  badge: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 99,
    color: "#fff",
    fontSize: "0.78rem",
    fontWeight: 700,
    fontFamily: "monospace",
  },
  btnRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  btn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  actionLabel: {
    marginBottom: 14,
    padding: "10px 16px",
    background: "#f0fdf4",
    borderRadius: 8,
    border: "1px solid #bbf7d0",
    fontSize: "0.9rem",
  },
};
