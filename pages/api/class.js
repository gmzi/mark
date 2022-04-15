// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const SERVER_URL = process.env.SERVER_URL;

export default async function handler(req, res) {
    let ticker = req.query.ticker.toLowerCase();
    const response = await fetch(`${SERVER_URL}/class/${ticker}`).then(async(res) => res.json());
    if (response.error){
        return res.status(404).json({error: 'not found'});
    } else {
        return res.status(200).json(response);
    }
}