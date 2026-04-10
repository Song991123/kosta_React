import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { down, incrementByAmount, up } from "./redux/store";
import Cart from "./components/Cart";
import Order from "./components/Order";

function App() {
  // useSelector를 이용해 store의 count 상태에 접근
  const no = useSelector((state : { count: { no: number } }) => state.count.no);
  const dispatch = useDispatch();

  const minusFn = () => {
    dispatch(down());
  }

  const plusFn = () => {
    dispatch(up());
  }

  const incrementByFive = () => {
    dispatch(incrementByAmount(5));
  }

  

  return (
    <>
      <h1>Redux Test</h1>
      <div className="Count">
        <button onClick={minusFn}>뺴기</button>
        <span>{no}</span>
        <button onClick={plusFn}>더하기</button>
        <button onClick={incrementByFive}>5씩 증가</button>
      </div>
      <hr />
      <Cart />
      <hr />
      <Order />
    </>
  );
}

export default App;
