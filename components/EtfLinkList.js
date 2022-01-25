import React from 'react';

export default function EtfLinksList({ etfTicker }) {

    const ticker = etfTicker.toUpperCase();

    const sources = {
        dividendsLast10: {
            title: "Dividends 10Y",
            url: `https://www.barrons.com/market-data/funds/${ticker}`
        },
        dividendsLast16: {
            title: "Dividends 16Y",
            url: `https://finance.yahoo.com/quote/${ticker}/history?period1=1146528000&period2=1642723200&interval=capitalGain%7Cdiv%7Csplit&filter=div&frequency=1mo&includeAdjustedClose=true`
        },
        totalReturns10Y: {
            title: "Total Returns 10Y",
            url: `https://finance.yahoo.com/quote/${ticker}/performance?p=${ticker}`
        }
    }

    const handleClick = (e) => {
        const windowObject = window.open(`${sources[e.target.id].url}`,
            `${ticker}-${sources[e.target.id].title}`,
            // "left=100,bottom=100,width=320,height=320"
            "right=100, top=900, width=500, popup=yes, rel=noopener, rel=noreferrer"
        );
        windowObject.focus()
    }

    return (
        <>
            <p>Links for ETF ticker <span>{ticker}</span></p>
            <ul>
                <button onClick={handleClick} id={'dividendsLast10'}>{sources.dividendsLast10.title}</button>
                <button onClick={handleClick} id="totalReturns10Y">{sources.totalReturns10Y.title}</button>
                <button onClick={handleClick} id="dividendsLast16">{sources.dividendsLast16.title}</button>
            </ul>
        </>
    )

}