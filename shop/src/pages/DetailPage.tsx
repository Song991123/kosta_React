import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Nav } from 'react-bootstrap';
import styled from "styled-components";

const URLS: Record<string, string> = {
    fruit: "https://raw.githubusercontent.com/Song991123/Song991123.github.io/main/react-data/fruit.json",
    veggie: "https://raw.githubusercontent.com/Song991123/Song991123.github.io/main/react-data/veggie.json",
};

const ContainerDiv = styled.div.attrs<{ $visible: boolean }>({ className: "container" })`
    margin-top:30px;
    opacity: ${({ $visible }) => $visible ? '1' : '0'};
    transition: all 0.5s;
`;
const NavStyled = styled(Nav).attrs({ variant: "tabs", defaultActiveKey: "link0" })`
    margin-top: 50px;
`;

const TabContentDiv = styled.div<{ $visible: boolean }>`
    margin-top: 20px;
    text-align: center;
    transform: ${({ $visible }) => $visible ? 'scale(1)' : 'scale(0)'};
    transition: all 0.5s;
`;


export default function DetailPage() {
    const { id, productName } = useParams<{ id: string; productName: string }>();
    const [item, setItem] = useState<any>(null);
    const [tab, setTab] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!productName || !URLS[productName]) return;
        axios.get(URLS[productName]).then(res => {
            const found = res.data.find((v: any) => v.id === Number(id));
            setItem(found || null);
        });
    }, [id, productName]);

    useEffect(() => {
        setVisible(false);
        const timer = setTimeout(() => setVisible(true), 10); // 0.01초 후 scale(1)
        return () => clearTimeout(timer);
    }, [item]);

    if (!item) return <div>상품 없음</div>;

    const { imgUrl, title, content, price } = item;

    return (
        <ContainerDiv $visible={visible}>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={imgUrl} width="100%" alt={title} />
                </div>
                <div className='col-md-6'>
                    <h4 className='pt-5'>{title}</h4>
                    <p>{content}</p>
                    <p>{price}원</p>
                    <button className='btn btn-danger'>주문하기</button>
                </div>
            </div>
            <NavStyled>
                <Nav.Item >
                    <Nav.Link onClick={() => { setTab(0)}}eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(1)}}eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(2)}}eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </NavStyled>
            <TabContent key={tab} tab={tab} />
        </ContainerDiv>
    )
}

function TabContent({ tab }: { tab: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        const timer = setTimeout(() => setVisible(true), 10); // 0.01초 후 scale(1)
        return () => clearTimeout(timer);
    }, [tab]);

    return (
        <TabContentDiv $visible={visible}>
            {tab === 0 && <div>버튼0 내용</div>}
            {tab === 1 && <div>버튼1 내용</div>}
            {tab === 2 && <div>버튼2 내용</div>}
        </TabContentDiv>
    );
}
