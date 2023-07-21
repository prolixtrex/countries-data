import { useContext, useState, useEffect } from 'react';
import Header from './Header';
import Countries from './Countries';
import CountryPage from './CountryPage';
import { ThemeContext } from './theme/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import useAxiosFetch from './api/axiosFetch';

function App() {
    // const [filter, setFilter] = useState("all");
    const { data, isLoading, error } = useAxiosFetch();
    const { theme } = useContext(ThemeContext);
    const [countries, setCountries] = useState([]);
    const [region, setRegion] = useState("default")

    useEffect(() => {
        if (isLoading === false && data.length !== 0) {
            setCountries(data)
        }
    }, [isLoading, data])

    return (
        <div className={`App ${theme}`}>
            <Header />
            <Routes>
                <Route path='/' element={<Countries {...{ isLoading, error, countries, setCountries, data, region, setRegion }} />} />
                <Route path='/countries/:country' element={<CountryPage {...{ countries, data }} />} />
            </Routes>
        </div>
    );
}

export default App;
