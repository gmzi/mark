export default class Source {
    constructor(symbol) {
        this.symbol = symbol;
    }
    // ------------------------------------------------------------------------
    // STOCK METHODS
    balance_sheet(symbol = this.symbol) {
        return {
            title: "balance sheet",
            url: `https://www.cnbc.com/quotes/${symbol}?tab=financials#timePeriod`
        }
    }
    income_statement(symbol = this.symbol) {
        return {
            title: "income statement",
            url: `https://apps.cnbc.com/view.asp?symbol=${symbol}&uid=stocks/financials&view=incomeStatement`
        }
    }
    cash_flow(symbol = this.symbol) {
        return {
            title: 'cash flow statement',
            url: `https://apps.cnbc.com/view.asp?symbol=${symbol}&uid=stocks/financials&view=cashFlowStatement`
        }
    }
    sec_fillings(symbol = this.symbol) {
        return {
            title: "SEC fillings",
            url: `https://apps.cnbc.com/view.asp?symbol=${symbol}&uid=stocks/sec`
        }
    }

    eps(symbol = this.symbol) {
        return {
            title: 'EPS',
            url: `${symbol}`
        }
    }

    financials() {
        const balance_sheet = this.balance_sheet();
        const income_statement = this.income_statement();
        const cash_flow = this.cash_flow();
        const sec_fillings = this.sec_fillings();
        return { balance_sheet, income_statement, cash_flow, sec_fillings }
    }

    // ------------------------------------------------------------------------
    // ETF METHODS
    dividendsLast10(symbol = this.symbol) {
        return {
            title: "Dividends 10Y",
            url: `https://www.barrons.com/market-data/funds/${symbol}`
        }
    }

    dividendsLast16(symbol = this.symbol) {
        return {
            title: "Dividends 16Y",
            url: `https://finance.yahoo.com/quote/${symbol}/history?period1=1146528000&period2=1642723200&interval=capitalGain%7Cdiv%7Csplit&filter=div&frequency=1mo&includeAdjustedClose=true`
        }
    }

    totalReturns10Y(symbol = this.symbol) {
        return {
            title: "Total Returns 10Y",
            url: `https://finance.yahoo.com/quote/${symbol}/performance?p=${symbol}`
        }
    }
}