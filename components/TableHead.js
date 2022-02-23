import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'

export default function TableHead({ etfTicker, remove }) {

    const ticker = etfTicker.toUpperCase();

    const handleClose = () => {
        remove('etf', etfTicker)
    }

    return (
        <th className={styles.th}>
            <button onClick={handleClose}>X</button>
            <span className={`${styles.span} ${styles.etfSpan}`}>{ticker}</span>
        </th>
    )
}

