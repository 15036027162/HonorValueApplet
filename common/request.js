import base_url from './config.js'
import {createNonceStr,createTimeStamp,getBrowserModel} from "./util.js";
// const publicParam = {
// 	  m_device_id: "device-PC-Browser",
// 	  m_nonce: "E6RJOI25",
	  
// 	  m_timestamp: "1623824039644",
// 	  m_signature: "05c31c7f40a3b3174cf35451ae688f9d",
	  
// 	  m_os_version: "v-20200709",
// 	  m_screen: "***x***",
// 	  m_model: "model-PC-Browser",
// 	  m_latitude: "",
// 	  m_longitude: "",
// 	  m_format: "",
	  
// 	  m_app_name:'shaoshan',
// 	  m_app_id: "shaoshan",
// 	  NO_SIGN:'N',
// 	  m_channel: "MlxcNddWeb",
// 	  m_platform:4,
// 	  m_version: "v-20200709",
// }
const publicParam = {
	  m_device_id: 'device-' + getBrowserModel(),//设备ID
	  m_nonce: createNonceStr(8),
	  
	  m_timestamp: createTimeStamp(),//时间戳
	  m_signature: "05c31c7f40a3b3174cf35451ae688f9d",
	  
	  m_os_version: "v-20200709",
	  m_screen: "***x***",
	  m_model: 'model-' + getBrowserModel(),// 设备型号,
	  m_latitude: "",
	  m_longitude: "",
	  m_format: "",
	  
	  m_app_name:'shaoshan',
	  m_app_id: "shaoshan",
	  NO_SIGN:'N',
	  m_channel: "MlxcNddWeb",
	  m_platform:4,
	  m_version: "v-20200709",
}
const request = (method, url, data = {}, isToken = true,responseType='text') => {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key: 'Token',
      complete (response) {
        if (!response.data && isToken) {
					let pages = getCurrentPages()
					uni.redirectTo({
					  // url: `/pages/login/index?fullPath=${pages[pages.length-1].route}`,
					  // url: `/pages/login/login?fullPath=${pages[pages.length-1].route}`,
						url: `/pages/login/elogin?fullPath=${pages[pages.length-1].route}`
					})
        } else {
          uni.request({
            url: base_url + url,
            data: Object.assign({},publicParam,data),
            method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              Token: response.data||''
            },
			responseType: responseType,
            success(res) {
              if (res.data.code === 0 || res.data.code === '0') {
					resolve(res.data)
              } else if (res.data.code === '4002' || res.data.code === '4003'|| res.data.code === '4007' ) {
				    resolve(res.data)
					// let redirect = encodeURIComponent('/pages/userCenter/userCenter');
					// uni.navigateTo({
					//    url: '/pages/index/index?redirect =' + redirect
					// });
			  }else if (res.data.code === '4116' || res.data.code === '4115' ) {
				  // 发送短信验证码
				    resolve(res.data)
			  } else if (res.data.code === '4113' || res.data.code === '4114') {
				  // 修改手机号
				    resolve(res.data)
			  } else if (res.data.code === '4101' || res.data.code === '4102' || res.data.code === '4103' || res.data.code === '4104' || res.data.code === '4105'||res.data.code === '4106'||res.data.code === '4107'||res.data.code === '4108') {
				    resolve(res.data)
			  } else if (res.data.code === '4109' || res.data.code === '4110' || res.data.code === '4111' || res.data.code === '4112' || res.data.code === '4113'||res.data.code === '4114'|| res.data.code === '4115'||res.data.code === '4116'||res.data.code === '4117'||res.data.code === '4118') {
				    resolve(res.data)
			  } else {
				  console.log('请求异常')
				  console.log(res.data)
				  console.log('请求异常')
				  resolve(res.data)
              } 
            },
            fail(error) {
              // store.commit('Token', {})
              uni.showToast({
                title: '网络出错，稍后再试',
                icon: 'none'
              })
              reject(error)
            }
          })
        }
      }
    })
  })
}
// 图片上传
const uploadImg = (tempPath, url = '/mlxc/sys/user/logo') => {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key: 'Token',
      complete (response) {
        if (!response.data) {
          uni.redirectTo({
            url: '/pages/login/index'
          })
        }
        else {
          uni.uploadFile({
            url: base_url + url,
            filePath: tempPath,
            name: 'file',
            header: {
              Token: response.data
            },
            success: res => {
              let data = JSON.parse(res.data)
              if(data&&data.code===0) {
								if (data.url) {
								  resolve(data.url)
								} 
							}
							else {
							  uni.showToast({
							    title: '图片上传失败',
							    icon: 'none'
							  })
							  reject(new Error('request error'), res)
							}
            },
            fail: (res) => {
              uni.showToast({
                title: '图片上传失败',
                icon: 'none'
              })
              reject(new Error('request error'), res)
            }
          })
        }
      }
    })
  })
}
/* 随机函数的产生 */
// function createNonceStr(n) {
//     const charts = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//     var res = '';
//     for(var i = 0; i <n; i++){
//         var id = Math.ceil(Math.random()*35);
//         res += charts[id];
//     }
//     return res;
// }

// /* 时间戳产生的函数 */
// function createTimeStamp() {
//     //const moment = require('moment');
//     //return  moment(Date.now()).format('YYYYMMDDHHmmss');
//     const moment = new Date().getTime();
//     return  moment.toString();
// }
// /* 获取设备型号*/
// function getBrowserModel() {
//     return 'PC-Browser';
// }
 export {request,uploadImg}