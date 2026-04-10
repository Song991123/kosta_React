import React from 'react'
import styled from 'styled-components'

const FooterStyled = styled.div`
    padding: 20px;
    background-color: #000;
    color: #fff;
    text-align: center;
    width: 100%;
`;


export default function Footer() {
    return (
        <FooterStyled>
            &copy; 2026 Kosta Fruits ShoppingMall, Inc. All rights reserved.
        </FooterStyled>
    )
}
