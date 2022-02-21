export default function Table({ heads, turnover, expense, assets }) {
    return (
        <table>
            <thead>
                <tr></tr>
                {heads.map((h) => {
                    <tr>{h}</tr>
                })}
            </thead>
            <tbody>
                <tr>
                    <td>Turnover</td>
                    {turnover.map((t) => {
                        <td>{t}</td>
                    })}
                </tr>
                <tr>
                    <td>Expense Ratio</td>
                    {expense.map((e) => {
                        <td>{e}</td>
                    })}
                </tr>
                <tr>
                    <td>Net assets</td>
                    {assets.map((a) => {
                        <td>{a}</td>
                    })}
                </tr>
            </tbody>
        </table>
    )
}