import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <div>
            <h1>Admin Layout</h1>
            {/* 여기 안에서 /admin, /admin/manager가 바뀌어 렌더링 됨 */}
            <Outlet />
        </div>
    )
}
