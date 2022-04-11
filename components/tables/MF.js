import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect } from 'react';
import TableHead from '../TableHead';
import TableData from '../TableData';
import NestedTable from '../NestedTable';



export default function MF({MFTickers, data, loading, remove}) {

  useEffect(() => {
  }, [data, loading])

  const tableHeadList = MFTickers.map((e, i) => <TableHead key={`${i}-${e}`} mutualFundTicker={e} remove={remove} />)

  const priceList = data.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
  const weekRange52List = data.map((obj, i) => <TableData key={`${i}-${obj.week_range_52}`} data={obj.week_range_52} />)
  const year5List = data.map((obj, i) => <TableData key={`${i}-${obj.year_5}`} data={obj.year_5} />)
  const turnoverList = data.map((obj, i) => <TableData key={`${i}-${obj.symbol}`} data={obj.turnover_ratio} />)
  const expenseList = data.map((obj, i) => <TableData key={`${i}-${obj.expense_ratio}`} data={obj.expense_ratio} />)
  const netAssetsList = data.map((obj, i) => <TableData key={`${i}-${obj.net_assets}`} data={obj.net_assets} />)
  const alphaList = data.map((obj, i) => <TableData key={`${i}-${obj.alpha}`} data={obj.alpha} />)
  const betaList = data.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  const standardDevidationList = data.map((obj, i) => <TableData key={`${i}-${obj.standard_deviation}`} data={obj.standard_deviation} />)
  const rSquaredList = data.map((obj, i) => <TableData key={`${i}-${obj.r_squared}`} data={obj.r_squared} />)
  const yieldList = data.map((obj, i) => <TableData key={`${i}-${obj.yield}`} data={obj.yield} />)
  const incomeDividendList = data.map((obj, i) => <TableData key={`${i}-${obj.income_dividend}`} data={obj.income_dividend} />)
  const weekAvgReturn52List = data.map((obj, i) => <TableData key={`${i}-${obj.week_avg_return_52}`} data={obj.week_avg_return_52} />)
  const familyList = data.map((obj, i) => <TableData key={`${i}-${obj.fund_family}`} data={obj.fund_family} />)
  const categoryList = data.map((obj, i) => <TableData key={`${i}-${obj.category.slice(0, 5)}`} data={obj.category} />)
  const policyList = data.map((obj, i) => <TableData key={`${i}-${obj.policy.slice(0, 5)}`} data={obj.policy} isParagraph={true} />)

  const incomeHistoryList = data.map((obj, i) => <NestedTable key={`${i}-${obj.income_history.slice(0, 5)}`} data={obj.income_history} topAlign={true} />)
  const capitalGainsHistoryList = data.map((obj, i) => <NestedTable key={`${i}-${obj.capital_gains_history.slice(0, 5)}`} data={obj.capital_gains_history} topAlign={true} />)
  const sectorList = data.map((obj, i) => <NestedTable key={`${i}-${obj.sector_allocation.slice(0, 5)}`} data={obj.sector_allocation} />)
  const returnHistoryList = data.map((obj, i) => <NestedTable key={`${i}-${obj.return_history.slice(0, 5)}`} data={obj.return_history} topAlign={true} />)
  const top10List = data.map((obj, i) => <NestedTable key={`${i}-${obj.holdings_10.slice(0, 5)}`} data={obj.holdings_10} topAlign={false} />)
  const rankingList = data.map((obj, i) => <NestedTable key={`${i}-${obj.lipper_ranking.slice(0, 5)}`} data={obj.lipper_ranking} topAlign={false} />)


  return (
    <>
      <Head>
        <title>Mark/ETFs</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
      {MFTickers.length ? (
            <>
             {loading &&
                <div>
                    <p>Fetching data...</p>
                </div>
            }
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
                <td className={`${styles.td} ${styles.rowTitle}`}>Yield</td>
                {yieldList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>5 Year</td>
                {year5List}
              </tr>

              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Income Dividend</td>
                {incomeDividendList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>52W Avg Return</td>
                {weekAvgReturn52List}
              </tr>

              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Income History</td>
                {incomeHistoryList}
              </tr>

              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Capital Gains History</td>
                {capitalGainsHistoryList}
              </tr>

              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Total Returns History</td>
                {returnHistoryList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Alpha</td>
                {alphaList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Beta</td>
                {betaList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>S. Deviation</td>
                {standardDevidationList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>R. Squared</td>
                {rSquaredList}
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
                <td className={`${styles.td} ${styles.rowTitle}`}>Category</td>
                {categoryList}
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
