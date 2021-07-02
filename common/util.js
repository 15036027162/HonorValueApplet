/* 随机函数的产生 */
export const createNonceStr = (n) => {
    const charts = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = '';
    for(var i = 0; i <n; i++){
        var id = Math.ceil(Math.random()*35);
        res += charts[id];
    }
    return res;
};

/* 时间戳产生的函数 */
export const createTimeStamp = () => {
    //const moment = require('moment');
    //return  moment(Date.now()).format('YYYYMMDDHHmmss');
    const moment = new Date().getTime();
    return  moment.toString();
};

/* 获取设备型号*/
export const  getBrowserModel = () => {
    return 'PC-Browser';
}
//设置cookie
export const  setFetchCookie = (name,value,expireHours) => {
    var eDate = new Date();
    eDate.setTime(eDate.getTime() + expireHours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ((expireHours == null) ? "" : ";SameSite=None;expires=" + eDate.toUTCString());
}
