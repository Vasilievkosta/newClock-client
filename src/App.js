import React from 'react'
import { HashRouter } from 'react-router-dom'
import HeaderContainer from './components/HeaderContainer'
import AppRouter from './components/AppRouter'

const App = () => {
    return (
        <HashRouter>
            <HeaderContainer />
            <AppRouter />
        </HashRouter>
    )
}

export default App
