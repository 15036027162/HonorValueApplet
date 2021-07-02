import {request,uploadImg} from '@/common/request.js'

const api = {
	uploadImg,
	
	// 测试
	getList: data => request('get', '/member/v1/order/vote/test',data,false),
	
	// 登录注册
	loginByWeiXin: data => request('post', '/member/v2/login/member_QuickLoginByWeiXin',data,false),
	
	// 首页
	getDoorHonorIntrgral: data => request('get', '/integratemall/v2/a/honorCommendation/getDoorHonorIntrgral',data,false),// 家庭荣誉值可用已用积分
	// 积分公式
	getPublicityList: data => request('get', '/integratemall/v2/a/publicity/list',data,false),// 家庭荣誉值可用已用积分
	getInfoById: data => request('get', '/integratemall/v2/a/publicity/getInfoById',data,false),// 积分公示详情
	
	// 普惠金融
	getFinanceNew: data => request('get', '/integratemall/v1/a/finance/getFinanceNew',data,false),// 普惠金融
	getFinanceList: data => request('get', '/integratemall/v1/a/finance/list',data,false),// 普惠金融列表
	getFinanceDetail: data => request('get', '/integratemall/v1/w/finance/detail',data,false),// 普惠金融详情
	// 积分申报
	getPersonalList: data => request('get', '/integratemall/v2/a/personal/list',data,false),// 积分申报
	getPersonalSceneByCode: data => request('get', '/integratemall/v2/a/personal/getPersonalSceneByCode',data,false),// 获取申报类型
	addPersonalSceneByCode: data => request('post', '/integratemall/v2/a/personal/add',data,false),// 提交申请
	multipartFileUpload: data => request('post', '/commonality/v1/qiNiuYunUpload/multipartFileUpload',data,false),// 上传图片
	// 评级授信
	honorCommendationListWei: data => request('get', '/integratemall/v2/a/honorCommendation/honorCommendationListWei',data,false),// 评级授信 -- 列表
	honorListR: data => request('get', '/integratemall/v2/a/honorCommendation/honorList',data,false),// 积分排名 -- 荣誉值排行
	getSceneDictionary: data => request('get', '/integratemall/v2/a/honorCommendation/getSceneDictionary',data,false),// 积分排名-- 获取类别
	//首页-- 轮播图
	getHomePageAdv: data => request('get', '/integratemall/v1/a/adv/homeomePageAdv',data,false),
	// 信息公开
	getPolicyList: data => request('get', '/integratemall/v1/a/policy/policyListWei',data,false),// 信息公开
	getSelectDictionary: data => request('get', '/integratemall/v1/a/policy/getSelectDictionary',data,false),// 信息tab --获取市场热点（政策）类型
	getPolicyDetail: data => request('get', '/integratemall/v1/a/policy/policyDetail',data,false),// 信息公开详情
	getHonorstatementDetail: data => request('get', '/integratemall/v1/w/honorstatement/detail',data,false),// 信息公开详情
	
	//我的家庭首页
	getMyFamilyHome: data => request('get','/integratemall/v2/a/house/index', data, false ),
	//根据区县获取所有镇村信息
	getAllDistrict: data => request('get','/commonality/v1/division/allDistrictByRole', data, false),
	//申请实名认证信息
	applyAuthentication: data => request('post','/member/v2/a/authentication/application', data, false),
	//获取实名认证信息
	getAuthInfo: data => request('get','/member/v2/a/authentication/getInfo', data, false),
	//二维码获取用户信息
	getMemberInfoWithScene: data => request('get','/member/v1/member/memberInfoWithScene', data, false),
	// 家庭--捐赠
	houseDonate: data => request('post','/integratemall/v2/a/house/donate', data, false),
	
	//加入家庭
	joinHouse: data => request('post','/integratemall/v2/a/house/joinHouse', data, false),
	//获取家庭成员
	getFamilyMember: data => request('get','/integratemall/v2/a/house/getAllMember', data, false),
	//修改家庭成员关系
	setHouseType: data => request('post','/integratemall/v2/a/house/setHouseType', data, false),
	// 家庭消息
	houseMessageWei: data => request('get','/integratemall/v2/a/house/messageWei', data, false),
	//转让户主
	transferHouseHold: data => request('post','/integratemall/v2/a/house/setHouseHold', data, false),
	//移除家庭成员
	removeHouse: data => request('post','/integratemall/v2/a/house/removeHouse', data, false),
	// 根据code获取家庭户主  -- 选择要加入的家庭
	getDoorMemberByVillageCode: data => request('get','/member/v1/member/getDoorMemberByVillageCode', data, false),
	// 商城
	// getExGoods: data => request('get', '/integratemall/v2/a/exGoods/exGoods',data,false),// 商城--积分商城-物品列表
	getExGoods: data => request('get', '/integratemall/v2/a/exGoods/exGoodsNoPage',data,false),// 商城--积分商城-物品列表
	sceneQrCode: data => request('get', '/member/v1/qr/sceneQrCode',data,false),// 商城--积分商城-物品列表
	// 我的
	getAppMemberBaseInfo: data => request('get', '/member/v2/login/getAppMemberBaseInfo',data,false),// 我的 -- 获取个人信息
	sendShortMessageCode: data => request('post', '/member/v1/login/sendShortMessageCode',data,false),// 我的 --账号设置 -- 发送短信验证码
	changeMemberAppPhone: data => request('post', '/member/v1/login/changeMemberAppPhone',data,false),// 我的 --账号设置 -- 修改手机号
	retrievePasswordByType: data => request('post', '/member/v3/login/retrievePasswordByType',data,false),// 我的 --账号设置 -- 修改密码
	getBankList: data => request('get', '/member/v1/bank/list',data,false),// 我的 --卡包
	addBank: data => request('post', '/member/v1/bank/add',data,false),// 我的 --卡包
	setMemberPersonalInfo: data => request('post', '/member/v2/login/setMemberPersonalInfo',data,false),// 我的 --修改个人信息
	setMemberAvatar: data => request('post', '/member/v1/login/setMemberAvatar',data,false),// 我的 --修改个人信息头像
	// 退出登录
	memberLoginOut: data => request('post', '/member/v1/login/memberLoginOut',data,false),// 我的 --修改个人信息头像
	

  
}

export default api
