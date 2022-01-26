import React from 'react';
import Source from '../helpers/source';
import openLink from '../helpers/functions';

export default function StockLinkList({ stockTicker }) {

    const ticker = stockTicker.toUpperCase();

    const source = new Source(ticker)

    const handleClick = (e) => {
        const prop = e.target.id;
        openLink(prop, source, ticker)
    }

    return (
        <>
            <div>
                <span className="stockSpan">{ticker}</span>
            </div>
            <ul>
                <li><button onClick={handleClick} id="eps">{source.eps().title}</button></li>
                <li><button onClick={handleClick} id="balance_sheet">{source.balance_sheet().title}</button></li>
                <li><button onClick={handleClick} id="income_statement">{source.income_statement().title}</button></li>
                <li><button onClick={handleClick} id="cash_flow">{source.cash_flow().title}</button></li>
                <li><button onClick={handleClick} id="sec_fillings">{source.sec_fillings().title}</button></li>
            </ul>
        </>
    )

}



