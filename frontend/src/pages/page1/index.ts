import { TsrpcClient } from 'tsrpc-miniapp';
import { serviceProto } from '../../protocols/proto';

Page({
    onLoad() {
        this.setData({
            date: new Date().toISOString()
        })
    },

    async go() {
        // wx.navigateTo({ url: '/pages/page2/index'})
        let client = new TsrpcClient({
            server: 'http://localhost:3000',
            proto: serviceProto
        })
        console.log('Res', await client.callApi('Test', { name: 'Jack' }))
    }
})