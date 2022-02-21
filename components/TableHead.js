import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'
import openLink from '../helpers/openLink';
import useSWR from 'swr'

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
});

export default function TableHead({ etfTicker, remove }) {

    // const { data, error } = useSWR(`${SERVER}/etf?ticker=${etfTicker}`, fetcher)

    const ticker = etfTicker.toUpperCase();

    const source = new Source(ticker)

    const handleClick = (e) => {
        const prop = e.target.id;
        openLink(prop, source, ticker)
    }

    const handleClose = () => {
        remove('etf', etfTicker)
    }

    return (
        <th>
            <button onClick={handleClose}>X</button>
            {ticker}
        </th>

    )
}

