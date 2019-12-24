import { Global } from './global/Global';
App({
    onLaunch() {
        console.log('App launch')
        Global.test();
    }
})