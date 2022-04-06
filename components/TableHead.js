import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'

export default function TableHead({ etfTicker, stockTicker, mutualFundTicker, remove }) {

    let ticker; 

    if (etfTicker) {
        ticker = etfTicker.toUpperCase();
    } else if (stockTicker) {
        ticker = stockTicker.toUpperCase();
    } else if (mutualFundTicker) {
        ticker = mutualFundTicker.toUpperCase();
    }

    const handleClose = () => {
        if (etfTicker) {
            remove('etf', etfTicker)
        } else if (stockTicker) {
            remove('stock', stockTicker)
        } else if (mutualFundTicker) {
            remove('mutualFund', mutualFundTicker)
        }
    }

    return (
        <th className={styles.th}>
            <div className={styles.headerContainer}>
                <button onClick={handleClose} className={`${styles.button} ${styles.headerBtn}`}>X</button>
                {etfTicker ? (
                    <span className={`${styles.span} ${styles.etfSpan}`}> {ticker}</span>
                ) : (
                    <span className={`${styles.span} ${styles.stockSpan}`}> {ticker}</span>
                )}
            </div>
        </th >
    )
}

