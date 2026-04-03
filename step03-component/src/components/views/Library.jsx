import styled from "styled-components";

// styled-components: 스타일을 컴포넌트처럼 선언해서 JSX를 깔끔하게 유지
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 440px;
`;

const Wrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(180, 140, 200, 0.15);
`;

const Title = styled.h2`
  margin: 0 0 24px;
  color: #4a3f5c;
  font-size: 1.3rem;
  font-weight: 800;
`;

// Book 카드: accent 색상을 props로 받아서 왼쪽 spine 색상에 적용
const Card = styled.div`
  background: #fdf8ff;
  border-radius: 12px;
  padding: 16px 18px;
  border-left: 5px solid ${(props) => props.$accent};
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(180, 140, 200, 0.2);
  }
`;

const BookTitle = styled.p`
  margin: 0 0 4px;
  font-weight: 700;
  color: #4a3f5c;
  font-size: 0.95rem;
`;

const BookAuthor = styled.p`
  margin: 0;
  color: #a080a0;
  font-size: 0.8rem;
`;

const books = [
  { title: "React 완벽 가이드", author: "홍길동", accent: "#f4b8c8" },
  { title: "JavaScript 깊이 파기", author: "김철수", accent: "#b8d4f4" },
  { title: "CSS 마스터클래스", author: "이영희", accent: "#b8f4d4" },
  { title: "TypeScript 입문", author: "박민준", accent: "#f4d4b8" },
  { title: "Node.js 백엔드 개발", author: "최수진", accent: "#d4b8f4" },
  { title: "Git & GitHub 핸드북", author: "정우성", accent: "#f4f4b8" },
];

// named export
export function Book({ title, author, accent }) {
  return (
    <Card $accent={accent}>
      <BookTitle>{title}</BookTitle>
      <BookAuthor>{author}</BookAuthor>
    </Card>
  );
}

// default export
export default function Library() {
  return (
    <Wrapper>
      <Title>도서 목록</Title>
      <Grid>
        {books.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </Grid>
    </Wrapper>
  );
}
