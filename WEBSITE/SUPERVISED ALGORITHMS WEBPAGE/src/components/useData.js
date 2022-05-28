import { useState, useEffect } from 'react'
import { json } from 'd3';

export const useData = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(url).then(setData);
    }, []);

    return data;
}