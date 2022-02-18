import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'
import openLink from '../helpers/openLink';

export default function EtfLinksList({ etfTicker, remove }) {

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
        <div className={styles.container}>
            <div className={styles.tickerAndBtn}>
                <span className={`${styles.span} ${styles.etfSpan}`}>{ticker}</span>
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

