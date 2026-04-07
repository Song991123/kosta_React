import React, { memo } from "react";
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    h1{
        color: rgb(37,147,255); 
    }
`;

const Header = memo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');         // 두 자리수로 맞춤

    return (
        <HeaderWrapper>
            <h3>오늘의 Plan 🌱</h3>
            <h1>{year}-{month}-{day}</h1>
        </HeaderWrapper>
    );
});

export default Header;
