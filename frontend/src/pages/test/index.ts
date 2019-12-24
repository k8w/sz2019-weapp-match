import { TsrpcClient } from 'tsrpc-miniapp';
import { serviceProto } from '../../protocols/proto';

Page({
    onLoad() {
        this.setData({
            date: new Date().toISOString()
        })
    },

    async onBtnCallAPI() {
        let client = new TsrpcClient({
            server: 'http://127.0.0.1:3000',
            proto: serviceProto
        });

        let res = await client.callApi('Test', { name: 'xxxx' });
        console.log('Res', res);
    }
})