import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect } from 'react';
import TableHead from '../TableHead';
import TableData from '../TableData';
import NestedTable from '../NestedTable';


export default function Stock({stockTickers, data, loading, remove}) {

    useEffect(() => {
    }, [data, loading])


    
    // const stockList = stockTickers.map((s, i) => <StockLinkList key={`${i}-${s}`} stockTicker={s} remove={remove} />)
    const tableHeadListStock = stockTickers.map((e, i) => <TableHead key={`${i}-${e}`} stockTicker={e} remove={remove} />)
    const priceListStock = data.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
    const weekRange52List = data.map((obj, i) => <TableData key={`${i}-${obj.week_range_52}`} data={obj.week_range_52} />)
    const epsList = data.map((obj, i) => <TableData key={`${i}-${obj.eps}`} data={obj.eps} />)
    const peList = data.map((obj, i) => <TableData key={`${i}-${obj.p_e}`} data={obj.p_e} />)
    const mktCapList = data.map((obj, i) => <TableData key={`${i}-${obj.market_cap}`} data={obj.market_cap} />)
    const betaListStock = data.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
    const dividendListStock = data.map((obj, i) => <TableData key={`${i}-${obj.dividend}`} data={obj.latest_dividend} />)
    const dividendYieldListStock = data.map((obj, i) => <TableData key={`${i}-${obj.dividend_yield}`} data={obj.dividend_yield} />)
    const policyList = data.map((obj, i) => <TableData key={`${i}-${obj.policy.slice(0, 5)}`} data={obj.policy} isParagraph={true} />)
    // const weekHighList = data.map((obj, i) => <TableData key={`${i}-${obj.week_high}`} data={obj.week_high} />)
    // const weekLowList = data.map((obj, i) => <TableData key={`${i}-${obj.week_low}`} data={obj.week_low} />)

    return (
        <>
            <Head>
                <title>Mark/stocks</title>
                <link rel="icon" href="/favicon4.ico" />
            </Head>
                {/* {stockList} */}
            {stockTickers.length ? (
                <>
            <div className={styles.grid}>
                    <table className={styles.table}>
                        <thead className={`${styles.tHead} ${styles.stockHead}`}>
                            <tr>
                                <th className={styles.th}></th>
                                {tableHeadListStock}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Price $</td>
                                {priceListStock}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>52W Range</td>
                                {weekRange52List}
                            </tr>
                            
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>EPS(TTM)</td>
                                {epsList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>P/E(TTM)</td>
                                {peList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Latest Dividend</td>
                                {dividendListStock}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Dividend Yield</td>
                                {dividendYieldListStock}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Market Cap</td>
                                {mktCapList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Beta</td>
                                {betaListStock}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Investment Policy</td>
                                {policyList}
                            </tr>
                        </tbody>
                    </table>
            </div>
            </>
                ) : null}
        </>
    )
}
