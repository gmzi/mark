import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'
import openLink from '../helpers/openLink';
import useSWR from 'swr'

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
});

export default function EtfTable({ etfTicker, remove }) {

    const { data, error } = useSWR(`${SERVER}/etf?ticker=${etfTicker}`, fetcher)

    const ticker = etfTicker.toUpperCase();

    const source = new Source(ticker)

    const handleClick = (e) => {
        const prop = e.target.id;
        openLink(prop, source, ticker)
    }

    const handleClose = () => {
        remove('etf', etfTicker)
    }

    if (error) {
        return "error"
    }
    if (!data) return <h1>loading</h1>

    return (
        <div className={styles.container}>
            <div>
                <p>{data.symbol}</p>
            </div>
            <div className={styles.tickerAndBtn}>
                <span className={styles.etfSpan}>{ticker}</span>
                <button onClick={handleClose}>X</button>
            </div>
            <ul className={styles.ul}>
                <li><button onClick={handleClick} id="totalReturns10Y">{source.totalReturns10Y().title}</button></li>
                <li><button onClick={handleClick} id={'dividendsLast10'}>{source.dividendsLast10().title}</button></li>
                <li><button onClick={handleClick} id="dividendsLast16">{source.dividendsLast16().title}</button></li>
            </ul>
        </div>
    )
}

