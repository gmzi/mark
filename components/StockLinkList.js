import React from 'react';
import Source from '../classes/source';

export default function StockLinkList({ stockTicker }) {

    const ticker = stockTicker.toUpperCase();

    const source = new Source(ticker)

    console.log(source.balance_sheet().url)

    const handleClick = (e) => {
        const prop = e.target.id;
        const windowObject = window.open(`${source[prop]().url}`,
            `${ticker}-${source[e.target.id].title}`,
            // "left=100,bottom=100,width=320,height=320"
            "right=100, top=900, width=500, popup=yes, rel=noopener, rel=noreferrer"
        );
        windowObject.focus()
    }

    return (
        <>
            <p>Links for Stock ticker <span>{ticker}</span></p>
            <h5>Summary</h5>
            <ul>
                <li><button onClick={handleClick} id="eps">{source.eps().title}</button></li>
            </ul>
            <h5>Financials</h5>
            <ul>
                <li><button onClick={handleClick} id="balance_sheet">{source.balance_sheet().title}</button></li>
                <li><button onClick={handleClick} id="income_statement">{source.income_statement().title}</button></li>
                <li><button onClick={handleClick} id="cash_flow">{source.cash_flow().title}</button></li>
                <li><button onClick={handleClick} id="sec_fillings">{source.sec_fillings().title}</button></li>
            </ul>
        </>
    )

}



