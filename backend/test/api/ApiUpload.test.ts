import * as assert from 'assert';
import { testApiClient } from '../Base';
import * as http from "http";

describe('ApiUpload', function () {
    it('upload', async function () {
        const content = 'abcdefg12345';

        let res = await testApiClient.callApi('Upload', {
            openId: 'test',
            file: new Uint8Array(Buffer.from(content)),
            ext: '.png'
        });

        let download = await new Promise(rs => {
            http.get('http://localhost:3000/static/' + res.uri, res => {
                let data = '';
                res.on('data', v => {
                    data += v;
                })
                res.on('end', () => {
                    assert.strictEqual(data, content);
                    rs();
                })
            })
        })
    })
})