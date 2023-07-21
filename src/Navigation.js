import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { PiCaretDownBold } from 'react-icons/pi'
import './navigation.css'

const Navigation = ({ search, setSearch, region, setRegion }) => {

    return (
        <nav className='navigation'>
            <form className='form'>
                <div className='search'>
                    <label htmlFor='input'>
                        <FaSearch className='icon' />
                    </label>
                    <input id='input' type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search for a country...' />
                </div>
                <div className='filter'>
                    <select onChange={(e) => setRegion(e.target.value)} defaultValue={region}>
                        <option value="default">Region (All)</option>
                        <option value="africa">Africa</option>
                        <option value="americas">America</option>
                        <option value="europe">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="oceania">Oceania</option>
                    </select>
                    <PiCaretDownBold className='caret' />
                </div>
            </form>
        </nav>
    )
}

export default Navigation