import React, { useContext } from 'react'
import { FaMoon } from 'react-icons/fa'
import { ThemeContext } from './theme/ThemeContext'
import './header.css'

const Header = () => {
    const { toggleTheme } = useContext(ThemeContext)

    return (
        <header className='heading'>
            <h1>Where in the world?</h1>
            <button onClick={toggleTheme}><FaMoon className='moon' /> Dark Mode</button>
        </header>
    )
}

export default Header