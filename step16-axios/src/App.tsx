import "./App.css";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const serverIP = import.meta.env.VITE_API_SERVER_IP;

function App() {
  console.log("serverIP = " + serverIP);
  // fetch 함수로 비동기 통신
  const selectAll = async () => {
    try {
      const res = await fetch(`${serverIP}/users`);
      console.log(res);
      const jsonResult = await res.json();
      jsonResult.forEach((user: User, index: number) => {
        console.log(
          index + " = " + user.id + " | " + user.name + " | " + user.username,
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  ///////
  // axios 라이브러리로 비동기 통신
  const axiosSelectAll = async () => {
    try {
      const res = await axios.get<User[]>("http://jsonplaceholder.typicode.com/users");
      console.log(res);
      const jsonResult = res.data;
      jsonResult.forEach((user: User, index: number) => {
        console.log(
          index + " = " + user.id + " | " + user.name + " | " + user.username,
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  const axiosSelectById = async () => {
    // axios({
    //   method: "GET",
    //   url: "http://jsonplaceholder.typicode.com/users/1",
    //   // data;
    // })
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((err) => { console.log(err); });

    // async await
    try {
      const res = await axios({
        method: "GET",
        url: "http://jsonplaceholder.typicode.com/users/1",
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>fetch Test</h1>
      <button onClick={selectAll}>get - selectAll</button>
      <h1>Axios Test</h1>
      <button onClick={axiosSelectAll}>get - selectAll</button>
      <button onClick={axiosSelectById}>get - selectById</button>
      <h3> Spring boot 연동하기(CRUD)</h3>
      {/* <button onClick={insertUser}>post - user등록</button>
      <button onClick={deleteUser}>delete - user삭제</button>
      <button onClick={updateUser}>put - user수정</button>
      <button onClick={getbyId}>get - user 부분조회 </button>
      <button onClick={getUsers}>get - user전체조회</button> */}
    </>
  );
}

export default App;
