import { useNavigate } from 'react-router-dom'

export default function Header() {
    const nav = useNavigate()

    const routes = [
        { name: 'Home', path: '/' },
        { name: '회원가입', path: '/joinForm' },
        { name: '로그인', path: '/loginForm' },
        { name: '글쓰기', path: '/saveForm' },
    ]
    

    return (
        <header className="header">
            <h1>JWT Board Practice</h1>
            {routes.map((route) => (
                <button className="nav-button" key={route.path} onClick={() => nav(route.path)}>
                    {route.name}
                </button>
            ))}
        </header>
    )
}
