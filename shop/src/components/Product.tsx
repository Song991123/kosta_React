import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";

const ProductDiv = styled.div.attrs({ className: "col-md-4" })`
    margin-bottom: 50px;

    img {
        width: 80%;
    }

    h4 {
        margin-top: 10px;
    }
`;

const StyledNavLink = styled(Nav.Link)`
    text-decoration: none;
    color: #000;
    text-align: center;

    &:hover {
        color: green;
    }
`;

export default function Product(props: any) {
    if(!props.productData) {
        return null; // productData가 없는 경우 아무것도 렌더링하지 않음
    }

    const { id, title, imgUrl, content, price } = props.productData;
    const { productName } = props;
    const navigate = useNavigate();
    const url = `/detail/${productName}/${id}`;

    return (
        <ProductDiv>
            <StyledNavLink onClick={() => navigate(url)}>
                <img src={imgUrl} alt={title} />
                <h4>{title}</h4>
                <span>{content}</span>
                <p>{price}</p>
            </StyledNavLink>
        </ProductDiv>
    );
}
