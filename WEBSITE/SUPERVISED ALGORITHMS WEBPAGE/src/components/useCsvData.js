import { useState, useEffect } from 'react';
import { csv } from 'd3';

export const useCsvData = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(url).then(setData);
    }, []);

    return data;
}