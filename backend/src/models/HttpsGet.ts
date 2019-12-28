import * as https from "https";

export async function httpsGet(url: string): Promise<string> {
    return new Promise<string>((rs, rj) => {
        https.get(url, res => {
            let data = '';
            res.on('data', v => {
                data += v;
            });
            res.on('error', e => {
                rj(e);
            });
            res.on('end', () => {
                rs(data);
            })
        })
    })
}