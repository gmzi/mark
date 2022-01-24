import React from 'react';

export default function LinksList({ etfTicker }) {

    const sources = {
        dividendsLast10: {
            title: "Dividends 10Y",
            url: `https://www.barrons.com/market-data/funds/${etfTicker.toUpperCase()}`
        },
        dividendsLast16: {
            title: "Dividends 16Y",
            url: `https://finance.yahoo.com/quote/${etfTicker.toUpperCase()}/history?period1=1146528000&period2=1642723200&interval=capitalGain%7Cdiv%7Csplit&filter=div&frequency=1mo&includeAdjustedClose=true`
        },
        totalReturns10Y: {
            title: "Total Returns 10Y",
            url: `https://finance.yahoo.com/quote/${etfTicker.toUpperCase()}/performance?p=${etfTicker.toUpperCase()}`
        }
    }

    const handleClick = (e) => {
        window.open(sources[e.target.id].url, sources[e.target.id].title, "left=100,top=100,width=320,height=320");
    }

    return (
        <>
            <p>Links for ETF ticker <span>{etfTicker.toUpperCase()}</span></p>
            <ul>
                <button onClick={handleClick} id={'dividendsLast10'}>{sources.dividendsLast10.title}</button>
                <button onClick={handleClick} id="totalReturns10Y">{sources.totalReturns10Y.title}</button>
                <button onClick={handleClick} id="dividendsLast16">{sources.dividendsLast16.title}</button>
            </ul>
        </>
    )

}