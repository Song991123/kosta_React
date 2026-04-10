import React from 'react'
import { Outlet } from 'react-router-dom'

export default function About() {
    return (
        <div>
            <h4>회사소개</h4>
            <Outlet></Outlet>
        </div>
    )
}
