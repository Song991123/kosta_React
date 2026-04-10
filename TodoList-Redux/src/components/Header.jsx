import React, { memo } from "react";
import styled from 'styled-components';
import { dateString } from "../utils";

const HeaderWrapper = styled.div`
    h1{
        color: rgb(37,147,255); 
    }
`;

const Header = memo(() => { 
    return (
        <HeaderWrapper>
            <h3>오늘의 Plan 🌱</h3>
            <h1>{dateString}</h1>
        </HeaderWrapper>
    );
});

export default Header;
