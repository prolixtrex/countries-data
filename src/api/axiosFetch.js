import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.request('https://restcountries.com/v3.1/all')
                setData(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [])

    return { data, isLoading, error };
}

export default useAxiosFetch;

