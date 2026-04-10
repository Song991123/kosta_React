import React from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">과일농장</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/")}>홈으로</Nav.Link>
                <Nav.Link onClick={() => navigate("/detail")}>상세페이지</Nav.Link>
                <Nav.Link onClick={() => navigate("/cart")}>장바구니</Nav.Link>
                <Nav.Link onClick={() => navigate("/about")}>회사소개</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
