import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Product from "../components/Product";
import Title from "../components/Title";
import { Button } from "react-bootstrap";

const FRUIT_URL = "https://raw.githubusercontent.com/Song991123/Song991123.github.io/main/react-data/fruit.json";
const VEGGIE_URL = "https://raw.githubusercontent.com/Song991123/Song991123.github.io/main/react-data/veggie.json";

const Slider = styled.div.attrs({ className: "slider" })`
    height: 500px;
    background-image: url("/img/slider.jpg");
    background-size: cover;
    background-position: center;
    margin-bottom: 30px;
`;

const ContainerDiv = styled.div.attrs({ className: "container" })`
    text-align: center;
    margin-top: 30px;
`;

const ButtonGroup = styled.div`
    text-align: center;
`;

export default function Main() {
    const [fruit, setFruit] = useState<any[]>([]);
    const [allVeggie, setAllVeggie] = useState<any[]>([]);
    const [visibleVeggieCount, setVisibleVeggieCount] = useState(3);

    useEffect(() => {
        axios.get(FRUIT_URL).then(res => setFruit(res.data));
        axios.get(VEGGIE_URL).then(res => setAllVeggie(res.data));
    }, []);

    const visibleVeggie = allVeggie.slice(0, visibleVeggieCount);

    const showMoreVeggie = () => {
        setVisibleVeggieCount(prev => Math.min(prev + 3, allVeggie.length));
    }

    const sortByName = () => {
        setFruit(prev => [...prev].sort((a, b) => a.title > b.title ? 1 : -1));
    }

    const sortByPriceLowToHigh = () => {
        setFruit(prev => [...prev].sort((a, b) => a.price - b.price));
    }

    const sortByPriceHighToLow = () => {
        setFruit(prev => [...prev].sort((a, b) => b.price - a.price));
    }

    return (
        <>
            <Slider />
            <Title index={0} />
            <ButtonGroup>
                <Button variant="outline-primary" onClick={sortByName}>이름순</Button>{' '}
                <Button variant="outline-secondary" onClick={sortByPriceLowToHigh}>낮은 가격순</Button>{' '}
                <Button variant="outline-success" onClick={sortByPriceHighToLow}>높은 가격순</Button>{' '}
            </ButtonGroup>
            <ContainerDiv>
                <div className="row">
                    {fruit.map((fruit, i) => (
                        <Product productData={fruit} i={i} key={fruit.id} productName="fruit"/>
                    ))}
                </div>
            </ContainerDiv>
            <Title index={1} />
            <ButtonGroup>
                {visibleVeggieCount < allVeggie.length && (
                    <Button variant="outline-success" onClick={showMoreVeggie}> + 3개 상품 더 보기 </Button>
                )}{' '}
            </ButtonGroup>
            <ContainerDiv>
                <div className="row">
                    {visibleVeggie.map((veggie, i) => (
                        <Product productData={veggie} i={i} key={veggie.id} productName="veggie"/>
                    ))}
                </div>
            </ContainerDiv>
        </>
    );
}
