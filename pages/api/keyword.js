// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TickerSymbols } from "../../lib/data";

export default function handler(req, res) {
    let search = req.query.search;
    search = search.toLowerCase();
    // const suggestions =TickerSymbols.filter( f => 
    //     (JSON.stringify(f).toLowerCase().indexOf(search) !== -1)
    //    )
    const shortList = TickerSymbols.filter((suggestion) => suggestion.symbol.toLowerCase().indexOf(search) > -1)
    const format = shortList.map(f => [f.symbol + ', ' + f.name]);
    const data = [].concat(...format);
    res.status(200).json(data);
}