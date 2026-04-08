import './App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Detail from './pages/board/Detail'
import Home from './pages/board/Home'
import SaveForm from './pages/board/SaveForm'
import UpdateForm from './pages/board/UpdateForm'
import JoinForm from './pages/user/JoinForm'
import LoginForm from './pages/user/LoginForm'
import Update from './pages/user/Update'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joinForm" element={<JoinForm />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/saveForm" element={<SaveForm />} />
          <Route path="/boards/:id" element={<Detail />} />
          <Route path="/boards/:id/edit" element={<UpdateForm />} />
          <Route path="/user/update" element={<Update />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
