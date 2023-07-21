import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa'
import './countryPage.css';

const CountryPage = ({ countries, data }) => {
    const { country } = useParams()
    const [ready, setReady] = useState(false)
    const state = countries.find(state => state.name.common === country)

    const [name, setName] = useState('')
    const [popultation, setPopultation] = useState()
    const [region, setRegion] = useState('')
    const [subRegion, setSubRegion] = useState('')
    const [capital, setCapital] = useState('')
    const [tld, setTld] = useState('')
    const [nativeName, setNativeName] = useState([])
    const [languages, setLanguages] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [borderCode, setBorderCode] = useState([])
    const [borders, setBorders] = useState([])



    useEffect(() => {
        const assignValues = () => {
            setName(state.name.common)
            setPopultation(state.population.toLocaleString())
            setRegion(state.region)
            setSubRegion(state.subregion)
            setCapital(state.capital[0])
            setTld(state.tld[0])
            setNativeName(Object.values(state.name.nativeName))
            setLanguages(Object.values(state.languages))
            setCurrencies(Object.values(state.currencies))
            setBorderCode(state.borders)
        }

        const findBorders = () => {
            const result = [];
            if (borderCode) {
                borderCode.forEach(val => result.push(data.find(country => country.cca3 === val)))

                //filter out borders that are undefined, false or empty
                setBorders(result.filter(border => border).map(border => border !== undefined && border.name.common))
            }
        }


        if (state) {
            assignValues();
            findBorders();
            setReady(true)
        }

    }, [state, data, borderCode])

    // console.log(borders)

    return (
        <main className='main countryPage'>
            {
                ready && (
                    <>
                        <div className='back'>
                            <Link type='button' to={`/`}><FaLongArrowAltLeft className='arrow' /><span>Back</span></Link>
                        </div>
                        <div className='details'>
                            <div className='flag'>
                                <img src={state.flags.png} alt={state.flags.alt} />
                            </div>
                            <div className='facts'>
                                <div className='name'>
                                    <h2>{name}</h2>
                                </div>
                                <div className='info'>
                                    <div>
                                        <p>Native Name: <span>{nativeName.map(name => name.common).join(", ")}</span></p>
                                        <p>Population: <span>{popultation}</span></p>
                                        <p>Region: <span>{region}</span></p>
                                        <p>Sub Region: <span>{subRegion}</span></p>
                                        <p>Capital: <span>{capital}</span></p>
                                    </div>
                                    <div>
                                        <p>Top Level Domain: <span>{tld}</span></p>
                                        <p>Currencies: <span>{currencies.map(curr => curr.name).join(", ")}</span></p>
                                        <p>Languages: <span>{languages.join(", ")}</span></p>
                                    </div>
                                </div>
                                <div className='border'>
                                    {borders.length > 0 &&
                                        <>
                                            <p>Border Countries: </p>
                                            {borders.map((name, index) => (
                                                <Link to={`/countries/${name}`} key={index}>{name}</Link>
                                            ))}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </main>
    )
}

export default CountryPage;