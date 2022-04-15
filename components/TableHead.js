import React from 'react';
import styles from '../styles/Home.module.css';

export default function TableHead({asset_class, ticker, remove}){

    const displayTicker = ticker.toUpperCase();


    const handleClose = () => {
        remove(asset_class, ticker)
    }

    if (asset_class === "stock") {
        return (
            <th className={`${styles.th} ${styles.stockHead}`}>
                <div className={styles.headerContainer}>
                    <button onClick={handleClose} className={`${styles.button} ${styles.headerBtn}`}>X</button>
                    <span className={`${styles.span} ${styles.stockSpan}`}> {displayTicker}</span>
                </div>
            </th>
        )
    }

    if (asset_class === "mf") {
        return (
            <th className={`${styles.th} ${styles.mfHead}`}>
                <div className={styles.headerContainer}>
                    <button onClick={handleClose} className={`${styles.button} ${styles.headerBtn}`}>X</button>
                    <span className={`${styles.span} ${styles.mfSpan}`}> {displayTicker}</span>
                </div>
            </th>
        )
    }

    return (
        <th className={`${styles.th} ${styles.etfHead}`}>
                <div className={styles.headerContainer}>
                    <button onClick={handleClose} className={`${styles.button} ${styles.headerBtn}`}>X</button>
                    <span className={`${styles.span} ${styles.etfSpan}`}> {displayTicker}</span>
                </div>
            </th>
    )
}