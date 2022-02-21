import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'
import openLink from '../helpers/openLink';
import useSWR from 'swr'
import useEtfData from '../helpers/useEtfData';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
});

export default function EtfTable({ etfTicker, remove }) {

    const { newData, update } = useEtfData()

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
        console.log(error)
        return null
    }
    if (!data) return <h1>loading</h1>

    if (data) {
        console.log(data)
        update(data)
    }

    // TODO: MAKE TABLE LAYOUT, MAYBE WITH TABLE NAMES IN HOME AND TABLE DATA FROM HERE, 
    // OR EVERYTHING FROM HERE. MAKE A NICE TABLE TO PUT ETFS SIDE BY SIDE WITH ONLY 
    // ONE ROW NAME IN THE LEFT AND ALL VALUES RIGHT.

    return (
        // <div className={styles.container}>
        //     <div className={styles.tickerAndBtn}>
        //         <span className={`${styles.span} ${styles.etfSpan}`}>{ticker}</span>
        //         <button onClick={handleClose}>X</button>
        //         <ul>
        //             <li>turnover: {data.turnover_ratio}</li>
        //             <li>expense ratio: {data.expense_ratio}</li>
        //             <li>expense ratio: {data.expense_ratio}</li>
        //             <li>net assets: {data.net_assets}</li>
        //         </ul>
        //         <div dangerouslySetInnerHTML={{ __html: data.return_history }} />
        //     </div>
        // </div>
        <th>
            <button onClick={handleClose}>X</button>
            {ticker}
        </th>

    )
}
