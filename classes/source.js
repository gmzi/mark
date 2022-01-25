export default class Source {
    constructor(symbol) {
        this.symbol = symbol;
    }

    balance_sheet() {
        return {
            title: "balance sheet",
            url: `https://www.cnbc.com/quotes/${this.symbol}?tab=financials#timePeriod`
        }
    }
    income_statement() {
        return {
            title: "income statement",
            url: `https://apps.cnbc.com/view.asp?symbol=${this.symbol}&uid=stocks/financials&view=incomeStatement`
        }
    }
    cash_flow() {
        return {
            title: 'cash flow statement',
            url: `https://apps.cnbc.com/view.asp?symbol=${this.symbol}&uid=stocks/financials&view=cashFlowStatement`
        }
    }
    sec_fillings() {
        return {
            title: "SEC fillings",
            url: `https://apps.cnbc.com/view.asp?symbol=${this.symbol}&uid=stocks/sec`
        }
    }

    eps() {
        return {
            title: 'EPS',
            url: `${this.symbol}`
        }
    }

    financials() {
        const balance_sheet = this.balance_sheet();
        const income_statement = this.income_statement();
        const cash_flow = this.cash_flow();
        const sec_fillings = this.sec_fillings();
        return { balance_sheet, income_statement, cash_flow, sec_fillings }
    }
}

const algo = new Source('ALGO');

console.log(algo.balance_sheet().url)