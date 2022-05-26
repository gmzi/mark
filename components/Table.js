import React, {useEffect} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TableHead from './TableHead';
import TableData from './TableData';
import NestedTable from './NestedTable';



export default function Table({etfTickers, etfData, MFTickers, MFData, stockTickers, stockData, remove}) {

// --------------------------------------------------------------------------------------------------------------
// MFs 
  const MFtableHeadList = MFTickers.map((e, i) => <TableHead key={`${i}-${e}`} asset_class={"mf"} ticker={e} remove={remove} />)
  const MFpriceList = MFData.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
  const MFweekRange52List = MFData.map((obj, i) => <TableData key={`${i}-${obj.week_range_52}`} data={obj.week_range_52} />)
  const MFyear5List = MFData.map((obj, i) => <TableData key={`${i}-${obj.year_5}`} data={obj.year_5} />)
  const MFturnoverList = MFData.map((obj, i) => <TableData key={`${i}-${obj.symbol}`} data={obj.turnover_ratio} />)
  const MFexpenseList = MFData.map((obj, i) => <TableData key={`${i}-${obj.expense_ratio}`} data={obj.expense_ratio} />)
  const MFnetAssetsList = MFData.map((obj, i) => <TableData key={`${i}-${obj.net_assets}`} data={obj.net_assets} />)
  const MFalphaList = MFData.map((obj, i) => <TableData key={`${i}-${obj.alpha}`} data={obj.alpha} />)
  const MFbetaList = MFData.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  const MFstandardDevidationList = MFData.map((obj, i) => <TableData key={`${i}-${obj.standard_deviation}`} data={obj.standard_deviation} />)
  const MFrSquaredList = MFData.map((obj, i) => <TableData key={`${i}-${obj.r_squared}`} data={obj.r_squared} />)
  const MFyieldList = MFData.map((obj, i) => <TableData key={`${i}-${obj.yield}`} data={obj.yield} />)
  const MFincomeDividendList = MFData.map((obj, i) => <TableData key={`${i}-${obj.income_dividend}`} data={obj.income_dividend} />)
  const MFweekAvgReturn52List = MFData.map((obj, i) => <TableData key={`${i}-${obj.week_avg_return_52}`} data={obj.week_avg_return_52} />)
  const MFfamilyList = MFData.map((obj, i) => <TableData key={`${i}-${obj.fund_family}`} data={obj.fund_family} />)
  const MFcategoryList = MFData.map((obj, i) => <TableData key={`${i}-cat-mf`} data={obj.category} />)
  const MFpolicyList = MFData.map((obj, i) => <TableData key={`${i}-policy-mf`} data={obj.policy} isParagraph={true} />)
  const MFincomeHistoryList = MFData.map((obj, i) => <NestedTable key={`${i}-income-history-mf`} data={obj.income_history} />)
  const MFcapitalGainsHistoryList = MFData.map((obj, i) => <NestedTable key={`${i}-cap-gains-mf`} data={obj.capital_gains_history} />)
  const MFsectorList = MFData.map((obj, i) => <NestedTable key={`${i}-sector-mf`} data={obj.sector_allocation} />)
  const MFreturnHistoryList = MFData.map((obj, i) => <NestedTable key={`${i}-return-h-mf`} data={obj.return_history} />)
  const MFtop10List = MFData.map((obj, i) => <NestedTable key={`${i}-holdings-mf`} data={obj.holdings_10} />)
  const MFrankingList = MFData.map((obj, i) => <NestedTable key={`${i}-ranking-mf`} data={obj.lipper_ranking} />)
// --------------------------------------------------------------------------------------------------------------
// ETFs
  const tableHeadList = etfTickers.map((e, i) => <TableHead key={`${i}-${e}`} asset_class={"etf"} ticker={e} remove={remove} />)
  const priceList = etfData.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
  const weekRange52List = etfData.map((obj, i) => <TableData key={`${i}-${obj.week_range_52}`} data={obj.week_range_52} />)
  const turnoverList = etfData.map((obj, i) => <TableData key={`${i}-${obj.symbol}`} data={obj.turnover_ratio} />)
  const expenseList = etfData.map((obj, i) => <TableData key={`${i}-${obj.expense_ratio}`} data={obj.expense_ratio} />)
  const netAssetsList = etfData.map((obj, i) => <TableData key={`${i}-${obj.net_assets}`} data={obj.net_assets} />)
  const navList = etfData.map((obj, i) => <TableData key={`${i}-${obj.nav}`} data={obj.nav} />)
  const betaList = etfData.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  const yieldList = etfData.map((obj, i) => <TableData key={`${i}-${obj.yield}`} data={obj.yield} />)
  const dividendLastList = etfData.map((obj, i) => <TableData key={`${i}-${obj.dividend_last}`} data={obj.dividend_last} />)
  const sectorList = etfData.map((obj, i) => <NestedTable key={`${i}-sector`} data={obj.sector_allocation} />)
  const dividendHistoryList = etfData.map((obj, i) => <NestedTable key={`${i}-dividend-history`} data={obj.dividend_history} />)
  const returnHistoryList = etfData.map((obj, i) => <NestedTable key={`${i}-return-history`} data={obj.return_history} />)
  const top10List = etfData.map((obj, i) => <NestedTable key={`${i}-top10`} data={obj.holdings_10} />)
  const rankingList = etfData.map((obj, i) => <NestedTable key={`${i}-ranking-etf`} data={obj.lipper_ranking} />)
  const familyList = etfData.map((obj, i) => <TableData key={`${i}-${obj.fund_family}`} data={obj.fund_family} />)
  const legalList = etfData.map((obj, i) => <TableData key={`${i}-${obj.legal_type}`} data={obj.legal_type} />)
  const policyList = etfData.map((obj, i) => <TableData key={`${i}-policy-etf`} data={obj.policy} isParagraph={true} />)
  // --------------------------------------------------------------------------------------------------------------
 //   STOCKS
 // const stockList = stockTickers.map((s, i) => <StockLinkList key={`${i}-${s}`} stockTicker={s} remove={remove} />)
  const STOCKtableHeadList = stockTickers.map((e, i) => <TableHead key={`${i}-${e}`} asset_class={"stock"} ticker={e} remove={remove} />)
  const STOCKpriceList = stockData.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
  const STOCKweekRange52List = stockData.map((obj, i) => <TableData key={`${i}-${obj.week_range_52}`} data={obj.week_range_52} />)
  const STOCKgrahamPriceLimitList = stockData.map((obj, i) => <TableData key={`${i}-${obj.graham_7}`} data={`${obj.graham_7} - ${obj.graham_12}`} />)
  const STOCKbookValuePerShareList = stockData.map((obj, i) => <TableData key={`${i}-${obj.book_value_per_share}`} data={obj.book_value_per_share} />)
  const STOCKepsList = stockData.map((obj, i) => <TableData key={`${i}-${obj.eps}`} data={obj.eps} />)
  const STOCKpeList = stockData.map((obj, i) => <TableData key={`${i}-${obj.p_e}`} data={obj.p_e} />)
  const STOCKmktCapList = stockData.map((obj, i) => <TableData key={`${i}-${obj.market_cap}`} data={obj.market_cap} />)
  const STOCKbetaList = stockData.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  const STOCKdividendList = stockData.map((obj, i) => <TableData key={`${i}-${obj.dividend}`} data={obj.latest_dividend} />)
  const STOCKdividendYieldList = stockData.map((obj, i) => <TableData key={`${i}-${obj.dividend_yield}`} data={obj.dividend_yield} />)
  const STOCKdividendHistoryList = stockData.map((obj, i) => <NestedTable key={`${i}-dividend-history`} data={obj.dividend_history} />)
  const STOCKpolicyList = stockData.map((obj, i) => <TableData key={`${i}-policy-stock`} data={obj.policy} isParagraph={true} />)
  // const weekHighList = stockData.map((obj, i) => <TableData key={`${i}-${obj.week_high}`} data={obj.week_high} />)
  // const weekLowList = stockData.map((obj, i) => <TableData key={`${i}-${obj.week_low}`} data={obj.week_low} />)

const MFPlaceholder = MFTickers.map((e, i) => <td className={`${styles.td} ${styles.rowTitle}`} key={`${i}-${e}`}>–</td>)
const ETFPlaceholder = etfTickers.map((e, i) => <td className={`${styles.td} ${styles.rowTitle}`} key={`${i}-${e}`}>–</td>)
const STOCKPlaceholder = stockTickers.map((e, i) => <td className={`${styles.td} ${styles.rowTitle}`} key={`${i}-${e}`}>–</td>)

  return (
    <>
      <Head>
        <title>Mark/ETFs</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
        {etfTickers.length || MFTickers.length || stockTickers.length ? (
          <>
      <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={`${styles.th} ${styles.emptyHead}`}></th>
                {tableHeadList}
                {MFtableHeadList}
                {STOCKtableHeadList}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.rowTitle}>Price $</td>
                {priceList}
                {MFpriceList}
                {STOCKpriceList}
              </tr>
              <tr>
                <td className={styles.rowTitle}>52W Range</td>
                {weekRange52List}
                {MFweekRange52List}
                {STOCKweekRange52List}
              </tr>
              {MFTickers.length ? (
              <>
              <tr>
                <td className={styles.rowTitle}>5 year</td>
                {ETFPlaceholder}
                {MFyear5List}
                {STOCKPlaceholder}
              </tr>
                </>
              ): null}
              {etfTickers.length ? (
              <tr>
                <td className={styles.rowTitle}>NAV</td>
                {navList}
                {MFPlaceholder}
                {STOCKPlaceholder}
              </tr>
              ) : null}
              {etfTickers.length || MFTickers.length ? (
              <>
              <tr>
                <td className={styles.rowTitle}>Net assets</td>
                {netAssetsList}
                {MFnetAssetsList}
                {STOCKPlaceholder}
              </tr>
              <tr>
                <td className={styles.rowTitle}>Turnover</td>
                {turnoverList}
                {MFturnoverList}
                {STOCKPlaceholder}
              </tr>
              <tr>
                <td className={styles.rowTitle}>Expense Ratio</td>
                {expenseList}
                {MFexpenseList}
                {STOCKPlaceholder}
              </tr>
              </>     
              ): null}

              {stockTickers.length ? (
                  <>
                    <tr>
                        <td className={styles.rowTitle}>Price Limit*</td>
                        {ETFPlaceholder}
                        {MFPlaceholder}
                        {STOCKgrahamPriceLimitList}
                    </tr>
                    <tr>
                        <td className={styles.rowTitle}>BVPS**</td>
                        {ETFPlaceholder}
                        {MFPlaceholder}
                        {STOCKbookValuePerShareList}
                    </tr>
                    <tr>
                        <td className={styles.rowTitle}>P/E(TTM)</td>
                        {ETFPlaceholder}
                        {MFPlaceholder}
                        {STOCKpeList}
                    </tr>
                    <tr>
                        <td className={styles.rowTitle}>EPS(TTM)</td>
                        {ETFPlaceholder}
                        {MFPlaceholder}
                        {STOCKepsList}
                    </tr>
                  </>
              ): null}
              <tr>
                <td className={styles.rowTitle}>Yield</td>
                {yieldList}
                {MFyieldList}
                {STOCKdividendYieldList}
              </tr>
              <tr>
                <td className={styles.rowTitle}>Latest Dividend</td>
                {dividendLastList}
                {MFincomeDividendList}
                {STOCKdividendList}
              </tr>
              {/* {etfTickers.length || MFTickers.length ? (
                  <>
              <tr>
                <td className={styles.rowTitle}>Dividend History</td>
                {dividendHistoryList}
                {MFincomeHistoryList}
                {STOCKPlaceholder}
              </tr>
              </>
              ) : null} */}
              <tr>
                <td className={styles.rowTitle}>Dividend History</td>
                {dividendHistoryList}
                {MFincomeHistoryList}
                {STOCKdividendHistoryList}
              </tr>
              {MFTickers.length ? (
                  <tr>
                    <td className={styles.rowTitle}>Capital Gains History</td>
                    {ETFPlaceholder}
                    {MFcapitalGainsHistoryList}
                    {STOCKPlaceholder}
                  </tr>
              ): null}
                {etfTickers.length || MFTickers.length ? (
              <>
              <tr>
                <td className={styles.rowTitle}>Total Returns History</td>
                {returnHistoryList}
                {MFreturnHistoryList}
                {STOCKPlaceholder}
              </tr>
              <tr>
                <td className={styles.rowTitle}>Sector Allocation</td>
                {sectorList}
                {MFsectorList}
                {STOCKPlaceholder}
              </tr>
              <tr>
                <td className={styles.rowTitle}>Top holdings</td>
                {top10List}
                {MFtop10List}
                {STOCKPlaceholder}
              </tr>
              </>
                ): null}
              <tr>
                <td className={styles.rowTitle}>Beta</td>
                {betaList}
                {MFbetaList}
                {STOCKbetaList}
              </tr>

              {MFTickers.length ? (
                  <>
                  <tr>
                    <td className={styles.rowTitle}>Alpha</td>
                    {ETFPlaceholder}
                    {MFalphaList}
                    {STOCKPlaceholder}
                  </tr>
                  <tr>
                    <td className={styles.rowTitle}>S. Deviation</td>
                    {ETFPlaceholder}
                    {MFstandardDevidationList}
                    {STOCKPlaceholder}
                  </tr>
                  <tr>
                    <td className={styles.rowTitle}>R. Squared</td>
                    {ETFPlaceholder}
                    {MFrSquaredList}
                    {STOCKPlaceholder}
                  </tr>
                  </>
              ): null}
              {etfTickers.length || MFTickers.length ? (
                  <>
              <tr>
                <td className={styles.rowTitle}>YTD Lipper Ranking</td>
                {rankingList}
                {MFrankingList}
                {STOCKPlaceholder}
              </tr>
              </>
                ): null}
              {MFTickers.length ? (
              <>
              <tr>
                <td className={styles.rowTitle}>Category</td>
                {ETFPlaceholder}
                {MFcategoryList}
                {STOCKPlaceholder}
              </tr>
                </>
              ): null}
              {etfTickers.length ? (
                  <tr>
                    <td className={styles.rowTitle}>Legal Type</td>
                    {legalList}
                    {MFPlaceholder}
                    {STOCKPlaceholder}
                  </tr>
              ): null}
              <tr>
                <td className={styles.rowTitle}>Investment Policy</td>
                {policyList}
                {MFpolicyList}
                {STOCKpolicyList}
              </tr>
              <tr>
                <td className={styles.rowTitle}>Fund Family</td>
                {familyList}
                {MFfamilyList}
                {STOCKPlaceholder}
              </tr>
            </tbody>
            {stockTickers.length ? (
              <tfoot>
                <tr>
                  <td>* Graham formula</td>
                  <td>** Book Value Per Share</td>
                  <th></th>
                </tr>
              </tfoot>
            ): null}
          </table>
      </div>
      </>
        ) : null}
    </>
  )
}
