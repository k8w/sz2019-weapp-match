import { Global } from '../../models/Global';

Page({
    onLoad() {
        this.setData({
            date: new Date().toISOString()
        })
    },

    async go() {
        console.log('Res', await Global.apiClient.callApi('Test', { name: 'Jack' }))
    }
})