import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Layout from '../components/layout'
import TableHead from '../components/TableHead';
import TableData from '../components/TableData';
import NestedTable from '../components/NestedTable';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MutualFunds() {
  const initialState = {
    mutualFundTicker: '',
  }

  const dataTemplate = {
    "symbol": "-",
    "price": "-",
    "turnover_ratio": "-",
    "fund_family": "-",
    "expense_ratio": "-",
    "net_assets": "-",
    "yield": "-",
    "nav": "-",
    "legal_type": "-",
    "dividend_history": "-",
    "dividend_last": "-",
    "holdings_10": "-",
    "beta": "-",
    "return_history": "-",
    "sector_allocation": "-",
    "lipper_ranking": "-"
  }

  const [formData, setFormData] = useState(initialState)
  const [mutualFundsTickers, setMutualFundsTickers] = useState([])
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState()

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }))
  }

  const handleClearSearch = () => {
    setFormData(() => (initialState))
  }

  useEffect(() => {
  }, [allData])

  function isDuplicate(array, value) {
    if ([...array].includes(value)) {
      return true;
    }
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.mutualFundTicker !== '') {
      if (isDuplicate(mutualFundsTickers, formData.mutualFundTicker)) {
        alert('already displayed')
        const newFormState = { stockTicker: formData.stockTicker, mutualFundTicker: '' }
        setFormData(() => newFormState)
        return;
      }
      const newTickers = [...mutualFundsTickers, formData.mutualFundTicker]

      // RENDER NEW TICKER IN LIST
      setMutualFundsTickers(newTickers)

      setLoading(true)
      // SEND REQUEST TO API
      const res = await fetch(`${SERVER}/mutual_fund/${formData.mutualFundTicker}`)
      if (res.ok) {
        const result = await res.json();
        dataTemplate = { ...result }
        const newData = [...allData, dataTemplate]
        setAllData(newData)
        setFormData(() => (initialState))
      } else {
        alert("that's not found")
        remove('mutualFund', formData.mutualFundTicker)
        setFormData(() => (initialState))
      }
        setLoading(false)
    }
  }

  const remove = (list, ticker) => {
    if (list === 'stock') {
      const removedArr = [...stockTickers].filter((s) => s !== ticker)
      setStockTickers(removedArr)
      const removedData = [...allStockData].filter((obj) => obj.symbol !== ticker)
      setAllStockData(removedData)
      return;
    }
    if (list === 'etf') {
      const removedArr = [...mutualFundsTickers].filter((e) => e !== ticker)
      setMutualFundsTickers(removedArr)
      const removedData = [...allData].filter((obj) => obj.symbol !== ticker)
      setAllData(removedData)
      return;
    }
    if (list === 'mutualFund') {
      const removedArr = [...mutualFundsTickers].filter((e) => e !== ticker)
      setMutualFundsTickers(removedArr)
      const removedData = [...allData].filter((obj) => obj.symbol !== ticker)
      setAllData(removedData)
      return;
    }
  }

  const tableHeadList = mutualFundsTickers.map((e, i) => <TableHead key={`${i}-${e}`} mutualFundTicker={e} remove={remove} />)

  const priceList = allData.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
  const weekRange52List = allData.map((obj, i) => <TableData key={`${i}-${obj.week_range_52}`} data={obj.week_range_52} />)
  const year5List = allData.map((obj, i) => <TableData key={`${i}-${obj.year_5}`} data={obj.year_5} />)
  const turnoverList = allData.map((obj, i) => <TableData key={`${i}-${obj.symbol}`} data={obj.turnover_ratio} />)
  const expenseList = allData.map((obj, i) => <TableData key={`${i}-${obj.expense_ratio}`} data={obj.expense_ratio} />)
  const netAssetsList = allData.map((obj, i) => <TableData key={`${i}-${obj.net_assets}`} data={obj.net_assets} />)
  const alphaList = allData.map((obj, i) => <TableData key={`${i}-${obj.alpha}`} data={obj.alpha} />)
  const betaList = allData.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  const standardDevidationList = allData.map((obj, i) => <TableData key={`${i}-${obj.standard_deviation}`} data={obj.standard_deviation} />)
  const rSquaredList = allData.map((obj, i) => <TableData key={`${i}-${obj.r_squared}`} data={obj.r_squared} />)
  const yieldList = allData.map((obj, i) => <TableData key={`${i}-${obj.yield}`} data={obj.yield} />)
  const incomeDividendList = allData.map((obj, i) => <TableData key={`${i}-${obj.income_dividend}`} data={obj.income_dividend} />)
  const weekAvgReturn52List = allData.map((obj, i) => <TableData key={`${i}-${obj.week_avg_return_52}`} data={obj.week_avg_return_52} />)
  const familyList = allData.map((obj, i) => <TableData key={`${i}-${obj.fund_family}`} data={obj.fund_family} />)
  const categoryList = allData.map((obj, i) => <TableData key={`${i}-${obj.category.slice(0, 5)}`} data={obj.category} />)
  const policyList = allData.map((obj, i) => <TableData key={`${i}-${obj.policy.slice(0, 5)}`} data={obj.policy} isParagraph={true} />)

  const incomeHistoryList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.income_history.slice(0, 5)}`} data={obj.income_history} topAlign={true} />)
  const capitalGainsHistoryList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.capital_gains_history.slice(0, 5)}`} data={obj.capital_gains_history} topAlign={true} />)
  const sectorList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.sector_allocation.slice(0, 5)}`} data={obj.sector_allocation} />)
  const returnHistoryList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.return_history.slice(0, 5)}`} data={obj.return_history} topAlign={true} />)
  const top10List = allData.map((obj, i) => <NestedTable key={`${i}-${obj.holdings_10.slice(0, 5)}`} data={obj.holdings_10} topAlign={false} />)
  const rankingList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.lipper_ranking.slice(0, 5)}`} data={obj.lipper_ranking} topAlign={false} />)
  


  return (
    <Layout>
      <Head>
        <title>Mark/mutual funds</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
      <h1 className={styles.h1}>/mutual funds/</h1>
      <form className={styles.form} onChange={handleChange} onSubmit={handleSubmit}>
        <label htmlFor="mutualFundTicker" />
        <input id="mutualFundTicker" type="text" name="mutualFundTicker" placeholder="enter MUTUAL FUND ticker" value={formData.mutualFundTicker} onChange={handleChange} />
        <div>
          <button type="submit" className={styles.button}>submit</button>
          <button onClick={handleClearSearch} className={styles.button}>clear</button>
        </div>
      </form >
        {mutualFundsTickers.length ? (
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
      <div>
        <span>data scraped from <a href="https://marketwatch.com" target="_blank" rel='noreferrer'>MarketWatch</a> and <a href="https://finance.yahoo.com" target="_blank" rel='noreferrer'>Yahoo Finance</a></span>
      </div>
      </>
        ) : null}
    </Layout>
  )
}
