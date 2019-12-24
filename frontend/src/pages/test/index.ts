import { TsrpcClient } from 'tsrpc-miniapp';
import { serviceProto } from '../../protocols/proto';
import { Global } from '../../global/Global';

Page({
    onLoad() {
        // Here you are
        console.log('Page load');
        Global.test();
    },

    async onBtnCallAPI() {
        // 初始化 测试注释
        let client = new TsrpcClient({
            server: 'http://127.0.0.1:3000',
            proto: serviceProto
        });

        let res = await client.callApi('Test', { name: 'xxxx' });
        console.log('Res', res);
    }
})