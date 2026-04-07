import React from "react";
import Ex08_Child02 from "./Ex08_Child02";
import { useContext } from "react";
import { GlobalContext } from "./Ex08_Context";
import '../styles/ex.css';

// 랜덤 이름 생성에 사용할 성씨와 이름 목록
const 성씨 = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
const 이름 = ['민준', '서연', '도윤', '지우', '하은', '준서', '수아', '지호', '예린', '태양'];

// 0 이상 max 미만의 랜덤 정수를 반환하는 함수
// 예: max가 10이면 0부터 9까지의 랜덤 정수를 반환
const randomIndex = (max) => Math.floor(Math.random() * max);

// 성씨 + 이름을 각각 랜덤으로 골라 조합해서 반환하는 함수
const randomName = () => 성씨[randomIndex(성씨.length)] + 이름[randomIndex(이름.length)];

export default function Ex08_Child01() {
    const {list, setList, btnClick01} = useContext(GlobalContext);

    const addList = () => {
        // 현재 list에 랜덤 이름을 가진 새 항목을 추가
        // id는 현재 목록 길이 + 1로 자동 증가
        setList([...list, { id: list.length + 1, name: randomName() }]);
    }

    return <div className="ex-wrap" style={{ background: '#f9f6ff', borderRadius: '10px', padding: '14px' }}>
        <h3>Child 01</h3>
        <div className="ex-btn-row">
            <button className="ex-btn" onClick={btnClick01}>눌러봐</button>
            <button className="ex-btn" onClick={addList}>리스트 추가</button>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
        <Ex08_Child02 />
    </div>;
}
