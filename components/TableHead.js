import React from 'react';
import styles from '../styles/Home.module.css';
import {colors} from '../lib/colors';

export default function TableHead({asset_class, ticker, remove}){

    const displayTicker = ticker.toUpperCase();
    
    const handleClose = () => {
        remove(asset_class, ticker)
    }

    if (asset_class === "stock") {
        return (
            <th className={`${styles.th}`} style={{backgroundColor: colors.stock.background}}>
                <div className={styles.headerContainer}>
                    <button onClick={handleClose} className={`${styles.button} ${styles.headerBtn}`}>X</button>
                    <span className={`${styles.span}`} style={{color: colors.stock.text}}> {displayTicker}</span>
                </div>
            </th>
        )
    }

    if (asset_class === "mf") {
        return (
            <th className={`${styles.th}`} style={{backgroundColor: colors.mf.background}}>
                <div className={styles.headerContainer}>
                    <button onClick={handleClose} className={`${styles.button} ${styles.headerBtn}`}>X</button>
                    <span className={`${styles.span}`} style={{color: colors.mf.text}}> {displayTicker}</span>
                </div>
            </th>
        )
    }

    return (
        <th className={`${styles.th}`} style={{backgroundColor: colors.etf.background}}>
                <div className={styles.headerContainer}>
                    <button onClick={handleClose} className={`${styles.button} ${styles.headerBtn}`}>X</button>
                    <span className={`${styles.span}`} style={{color: colors.etf.text}}> {displayTicker}</span>
                </div>
            </th>
    )
}