import React from 'react'
import styled from 'styled-components'

const TitleStyled = styled.h3<{ index: number }>`
    margin-top: ${({ index }) => index === 1 ? "40px" : "30px"};
    text-align: center;
`;
const TitleDesc = styled.p`
    text-align: center;
`;

const TitleInfo = [
    {
        title: '햇과일 BEST',
        desc: '농부가 추천하는 제철과일을 만나보세요'
    },
    {
        title: '채소 · 야채 TOP',
        desc: '농부가 추천하는 제철채소를 만나보세요'
    }
];


export default function Title({ index = 0 }: { index?: number }) {
    if (index < 0 || index >= TitleInfo.length) {
        return null; // 유효하지 않은 index인 경우 아무것도 렌더링하지 않음
    }

    return (
        <>
            <TitleStyled index={index}>{TitleInfo[index].title}</TitleStyled>
            <TitleDesc>{TitleInfo[index].desc}</TitleDesc>
        </>
    )
}
