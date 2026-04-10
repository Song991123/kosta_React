// Redux Toolkit에서 store를 설정하는 configureStore와 slice를 생성하는 createSlice를 불러옵니다.
import { configureStore, createSlice } from '@reduxjs/toolkit'

/*
createSlice() : reducer + action을 한번에 생성
configureStore() : store를 생성해 여러 slice를 합쳐줌
state.count.no : 컴포넌트에서 이 값으로 상태 접근 가능
dispatch(up()) : 액션을 실행하는 방법
*/

const countSlice = createSlice({
    name : "count",
    // 초기 상태 정의
    initialState : {no: 0},
    // reducers 객체 안에 상태를 변경하는 로직과 해당 액션을 정의
    reducers : {
        // 'up' 액션 : 상태 no를 1 증가시키는 로직
        up(state) {
            state.no += 1
        },
        // 'down' 액션 : 상태 no를 1 감소시키는 로직
        down(state) {
            state.no -= 1
        },
        // 'incrementByAmount' 액션 : 전달된 payload만큼 상태 no를 증가시키는 로직
        incrementByAmount(state, action) {
            state.no += action.payload
        }
    }
});

// 위 reducers에 정의된 액션 생성자(action creator)를 추출해 export
// 나중에 dispath(up()), dispath(down()) 등으로 액션을 실행할 때 사용
export const { up, down, incrementByAmount } = countSlice.actions;

let cartSlice = createSlice({
    name : "cart",
    initialState : [
        {id : 1, name : "토마토", count : 2},
        {id : 2, name : "수박", count : 1}
    ],
    reducers : {
        addCount(state, action){
            let num = state.findIndex((item) => item.id === action.payload);
            console.log(num);
            state[num].count ++;
        },
        addItem(state, action){
            state.push(action.payload);
        },
        sortName(state){
            state.sort((a, b) => a.name > b.name ? 1 : -1);
        }
    }
});

export const { addCount, addItem, sortName } = cartSlice.actions;




// configureStore()를 사용해 Redux store를 생성
// reducer 객체에 countSlice.reducer를 등록하여 상태 관리
export const store = configureStore({
    reducer : {
        count : countSlice.reducer, // state.count로 접근 가능
        cart : cartSlice.reducer // state.cart로 접근 가능
    }
});