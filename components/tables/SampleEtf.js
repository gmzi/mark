import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect } from 'react';
import TableHead from '../TableHead';
import TableData from '../TableData';
import NestedTable from '../NestedTable';
import TableGuide from './TableGuide';



export default function SampleEtf({etfTickers, data, loading, remove}) {

  useEffect(() => {
  }, [data, loading])

  const tableHeadList = etfTickers.map((e, i) => <TableHead key={`${i}-${e}`} etfTicker={e} remove={remove} />)
  const priceList = data.map((obj, i) => {
    const result = {name: "price", markup: <TableData key={`${i}-${obj.price}`} data={obj.price} />} 
  return result
  })
  // const weekRange52List = data.map((obj, i) => <TableData key={`${i}-${obj.week_range_52}`} data={obj.week_range_52} />)
  // const turnoverList = data.map((obj, i) => <TableData key={`${i}-${obj.symbol}`} data={obj.turnover_ratio} />)
  // const expenseList = data.map((obj, i) => <TableData key={`${i}-${obj.expense_ratio}`} data={obj.expense_ratio} />)
  // const netAssetsList = data.map((obj, i) => <TableData key={`${i}-${obj.net_assets}`} data={obj.net_assets} />)
  // const navList = data.map((obj, i) => <TableData key={`${i}-${obj.nav}`} data={obj.nav} />)
  // const betaList = data.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  // const yieldList = data.map((obj, i) => <TableData key={`${i}-${obj.yield}`} data={obj.yield} />)
  // const dividendLastList = data.map((obj, i) => <TableData key={`${i}-${obj.dividend_last}`} data={obj.dividend_last} />)
  // const sectorList = data.map((obj, i) => <NestedTable key={`${i}-${obj.sector_allocation.slice(0, 5)}`} data={obj.sector_allocation} />)
  // const dividendHistoryList = data.map((obj, i) => <NestedTable key={`${i}-${obj.dividend_history.slice(0, 5)}`} data={obj.dividend_history} topAlign={true} />)
  // const returnHistoryList = data.map((obj, i) => <NestedTable key={`${i}-${obj.return_history.slice(0, 5)}`} data={obj.return_history} topAlign={true} />)
  // const top10List = data.map((obj, i) => <NestedTable key={`${i}-${obj.holdings_10.slice(0, 5)}`} data={obj.holdings_10} topAlign={false} />)
  // const rankingList = data.map((obj, i) => <NestedTable key={`${i}-${obj.lipper_ranking.slice(0, 5)}`} data={obj.lipper_ranking} topAlign={false} />)
  // const familyList = data.map((obj, i) => <TableData key={`${i}-${obj.fund_family}`} data={obj.fund_family} />)
  // const legalList = data.map((obj, i) => <TableData key={`${i}-${obj.legal_type}`} data={obj.legal_type} />)
  // const policyList = data.map((obj, i) => <TableData key={`${i}-${obj.policy.slice(0, 5)}`} data={obj.policy} isParagraph={true} />)



  return (
    <>
      <Head>
        <title>Mark/ETFs</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
        {etfTickers.length ? (
          <>
          {loading &&
          <div>
            <p>Fetching data...</p>
          </div>}
      <div className={styles.grid}>
          <table className={styles.table}>
            <thead className={`${styles.tHead} ${styles.etfHead}`}>
              <tr>
                <th className={styles.th}></th>
                {tableHeadList}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Price $</td>
                {priceList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>52W Range</td>
                {weekRange52List}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>NAV</td>
                {navList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Net assets</td>
                {netAssetsList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Turnover</td>
                {turnoverList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Expense Ratio</td>
                {expenseList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Beta</td>
                {betaList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Yield</td>
                {yieldList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Last Dividend</td>
                {dividendLastList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Dividend History</td>
                {dividendHistoryList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Return History</td>
                {returnHistoryList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Sector Allocation</td>
                {sectorList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Top holdings</td>
                {top10List}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>YTD Lipper Ranking</td>
                {rankingList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Fund Family</td>
                {familyList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Legal Type</td>
                {legalList}
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
