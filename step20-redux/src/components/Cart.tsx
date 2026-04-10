import React from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { sortName, addCount } from '../redux/store'

export default function Cart() {
    // 그런데 이렇게 state 전체를 그대로 반환 시 컴포넌트가 리렌더링 될 때마다 state 전체가 바뀌어서 리렌더링이 일어남 => 성능 저하
    // let state = useSelector((state: any) => state);
    const { stateCart } = useSelector((state: any) => ({
        stateCart: state.cart
    }), shallowEqual); // 얕은 비교로 stateCart와 stateCount가 바뀌었는지만 비교해서 리렌더링 여부 결정
    // shallowEqual을 사용하면 stateCart와 stateCount가 바뀌었는지만 비교해서 리렌더링 여부를 결정하기 때문에 성능이 향상됨

    let cart = stateCart;
    let dispatch = useDispatch();

    return (
        <div>
            <h5> 장바구니 </h5>
            <table style={{border : "1px solid red"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item : {id: number, name: string, count: number}, i: number) => {
                            return (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td><button onClick={() => dispatch(addCount(item.id))}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <br />
            <button onClick={() => dispatch(sortName())}>이름순 정렬</button>
        </div>
    )
}
