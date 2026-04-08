import React from 'react'
import { useSearchParams } from 'react-router-dom';

export default function Admin() {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div>
            <h1>Admin영역 {searchParams.get('name')}</h1>
        </div>
    );
}
