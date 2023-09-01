import React from 'react'

import { Navigate } from 'react-router-dom'

import Tabs from '../components/UI/tabs/Tabs'

function AdminPanel() {
    const auth = !!localStorage.getItem('authKey')

    if (!auth) {
        return <Navigate to="/auth-admin" />
    }
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Страница админа</h2>
            <Tabs />
        </div>
    )
}

export default AdminPanel
