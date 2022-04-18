import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Layout from '../components/layout'
import Table from '../components/Table';
import Autocomplete from '../components/autocomplete';
import { colors } from '../lib/colors';


const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Home() {
  const [etfTickers, setEtfTickers] = useState([])
  const [etfData, setEtfData] = useState([])
  const [MFTickers, setMFTickers] = useState([])
  const [MFData, setMFData] = useState([])
  const [stockTickers, setStockTickers] = useState([])
  const [stockData, setStockData] = useState([])
  const [loading, setLoading] = useState()
  const [input, setInput] = useState("")


  const makeRequest = async (ticker) => {

    const response = await fetch(`${SERVER}/class/${ticker}`).then(async(res) => res.json());

    if(response.error){
      alert("that's not found")
      setLoading(false)
      return
    }

    if(response.asset_class === 'ETFs'){
      if (isDuplicate(etfTickers, ticker)) {
        alert('already displayed')
        return;
      }
      const newTickers = [...etfTickers, ticker]
      setEtfTickers(newTickers)
      await dataRequest('etf', ticker, etfData, setEtfData, setLoading)
      } else if (response.asset_class === 'Mutual Funds') {
        if (isDuplicate(MFTickers, ticker)) {
          alert('already displayed')
          return;
        }
        const newTickers = [...MFTickers, ticker]
        setMFTickers(newTickers)
        await dataRequest("mf", ticker, MFData, setMFData, setLoading)
      } else if (response.asset_class === 'Stocks') {
        if (isDuplicate(stockTickers, ticker)) {
          alert('already displayed')
          return;
        }
        const newTickers = [...stockTickers, ticker]
        setStockTickers(newTickers)
        await dataRequest("stock", ticker, stockData, setStockData, setLoading)
      }
      return;
  }

  const references = makeReferences(etfTickers, MFTickers, stockTickers)

  function isDuplicate(array, value) {
    if ([...array].includes(value)) {
      setLoading(false)
      return true;
    }
    return;
  }

  async function dataRequest(asset_class, ticker, stateData, setStateData){
    const res = await fetch(`${SERVER}/${asset_class}/${ticker}`)
        if (res.ok){
          const result = await res.json();
          const newData = [...stateData, result]
          setStateData(newData)
        } else {
          alert("that's not found")
          remove(asset_class, ticker)
        }
        setLoading(false)
        return
  }

  const remove = (asset_class, ticker) => {
    if (asset_class === 'stock') {
      const indexOfObject = stockData.findIndex((obj) => obj.symbol === ticker)
      stockData.splice(indexOfObject, 1)
      setStockData(stockData)
      const removedArr = [...stockTickers].filter((e) => e !== ticker)
      setStockTickers(removedArr)
      return;
    }
    if (asset_class === 'etf') {
      const indexOfObject = etfData.findIndex((obj) => obj.symbol === ticker)
      etfData.splice(indexOfObject, 1)
      setEtfData(etfData)
      const removedArr = [...etfTickers].filter((e) => e !== ticker)
      setEtfTickers(removedArr)
      return;
    }
    if (asset_class === 'mf') {
      const indexOfObject = MFData.findIndex((obj) => obj.symbol === ticker)
      MFData.splice(indexOfObject, 1)
      setMFData(MFData)
      const removedArr = [...MFTickers].filter((e) => e !== ticker)
      setMFTickers(removedArr)
      return;
    }
  }

  function makeReferences(arr1, arr2, arr3){
    const items = {
      etf: arr1.length > 0 ? (<li><div className={`${styles.refBox}`} style={{backgroundColor: colors.etf.background}}></div>ETFs</li>): null,
      mf: arr2.length > 0 ? (<li><div className={`${styles.refBox}`} style={{backgroundColor: colors.mf.background}}></div>Mutual Funds</li>): null,
      stock: arr3.length > 0 ? (<li><div className={`${styles.refBox}`} style={{backgroundColor: colors.stock.background}}></div>Stocks</li>): null
    }
    let etfsInTable = 0
    let mfsInTable = 0
    let stocksInTable = 0
    if (arr1.length > 0){
      etfsInTable = 1;
    }
    if (arr2.length > 0){
      mfsInTable = 1;
    }
    if (arr3.length > 0){
      stocksInTable = 1;
    }
    const classesInTable = etfsInTable + mfsInTable + stocksInTable
    // const totalLength = arr1.length + arr2.length + arr3.length;
    // if (totalLength > 1 && classesInTable > 1){
    if (classesInTable > 1){
      return (
        <ul className={styles.refList}>
          {items.etf}
          {items.mf}
          {items.stock}
        </ul>
      )
    }
    return null;
  }


  return (
    <Layout>
      <Head>
        <title>Mark</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
      <div className={styles.mainWrapper}>
        <h1 className={styles.h1}>|mark|</h1>
        <h2 className={styles.h2}>fund comparison tool</h2>
        <Autocomplete input={input} setInput={setInput} makeRequest={makeRequest} setLoading={setLoading}/>      
        {loading &&
            <div>
              <p>Fetching data...</p>
            </div>
        }
        {references}
        <Table etfTickers={etfTickers} etfData={etfData} MFTickers={MFTickers} MFData={MFData} stockTickers={stockTickers} stockData={stockData} loading={loading} remove={remove}/>
      </div>
    </Layout>
  )
}