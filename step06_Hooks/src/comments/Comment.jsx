import styled from 'styled-components';

// 최상위 래퍼
const Wrapper = styled.div`
    margin: 8px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    border: 1px solid gray;
    border-radius: 16px;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

// 프로필 이미지
const Image = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
`;

// 텍스트 컨테이너
const ContentContainer = styled.div`
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

// 이름
const NameText = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: black;
`;

// 댓글 내용
const CommentText = styled.span`
    font-size: 16px;
    color: black;
`;

export default function Comment({ profile, nameText, commentText }) {
    return (
        <Wrapper>
            <ImageContainer>
                <Image src={profile} alt={nameText} />
            </ImageContainer>
            <ContentContainer>
                <NameText>{nameText}</NameText>
                <CommentText>{commentText}</CommentText>
            </ContentContainer>
        </Wrapper>
    );
}
