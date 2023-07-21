import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import './countries.css'

const Countries = ({ countries, isLoading, error, data, setCountries, region, setRegion }) => {
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const result = countries.filter(countries => (countries.name.common).toLowerCase().includes(search.toLowerCase()))
        setFiltered(result)
    }, [search, countries, setCountries])

    useEffect(() => {
        if (region === "default") {
            setCountries(data)
        }
        else {
            const result = data.filter(countries => (countries.region).toLowerCase() === region.toLowerCase())
            setCountries(result)
        }
    }, [region, data, setCountries])

    useEffect(() => {
        setFiltered(countries)
    }, [countries])

    return (
        <main className='main'>
            <Navigation {...{ search, setSearch, region, setRegion }} />
            <div className='countries'>
                {
                    isLoading ? (
                        <p>Loading Data, Please wait</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        !filtered.length ? (
                            <p>No country to display! Please check your network and reload or adjust your search terms.</p>
                        ) : (
                            <ul>
                                {
                                    filtered.map((country, index) => (
                                        <li key={index}>
                                            <Link to={`/countries/${country.name.common}`} className='country'>
                                                <div className='flag'>
                                                    <img src={country.flags.png} alt={country.flags.alt} />
                                                </div>
                                                <div className='data'>
                                                    <div className='title'>
                                                        <h2 className='name'>{country.name.common}</h2>
                                                    </div>
                                                    <div className='info'>
                                                        <p>Population: {country.population.toLocaleString()}</p>
                                                        <p>Region: {country.region}</p>
                                                        <p>Capital: {country.capital}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>

                                    ))
                                }
                            </ul>
                        )
                    )
                }
            </div>
        </main>
    )
}

export default Countries