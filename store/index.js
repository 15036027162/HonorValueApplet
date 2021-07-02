import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      loginParam:{},
	  loginData:{},
	  userData:{},
	  swiperList:[],
	  doorIntrgralList:{},
	  villageData:{},
	  message: 'moumoumou',
	  familyInfoData:{},
	  selectedFamilyData:{},
	  refreshComponent:''
  },
  mutations: {
	  SET_LOGIN_PARAM(state, loginParam){
	  		  state.loginParam = loginParam
	  },
	  SET_LOGIN_DATA(state, loginData){
		  state.loginData = loginData
	  },
	  SET_USER_DATA(state, userData) {
	      state.userData = userData
	  },
	  SET_SWIPERLIST(state, swiperList) {
	      state.swiperList = swiperList
	  },
	  SET_DOOR_INTRGRAL_LIST(state, doorIntrgralList) {
	      state.doorIntrgralList = doorIntrgralList
	  },
	  SET_VILLAGE_DATA(state, villageData) {
	      state.villageData = villageData
	  },
	  SET_FAMILYINFO_DATA(state, familyInfoData) {
	      state.familyInfoData = familyInfoData
	  },
	  SET_SELECTED_FAMILYDATA(state, selectedFamilyData) {
	      state.selectedFamilyData = selectedFamilyData
	  },
	  SET_REFRESH_COMPONENT(state, refreshComponent) {
	      state.refreshComponent = refreshComponent
	  }
  },
  actions: {
	loginParam({ commit }, loginParam) {
	  commit('SET_LOGIN_PARAM', loginParam);
	},
    loginData({ commit }, loginData) {
      commit('SET_LOGIN_DATA', loginData);
    },
	userData({ commit }, userData) {
	  commit('SET_USER_DATA', userData);
	},
	setSwiperList({ commit }, swiperList) {
	    commit('SET_SWIPERLIST', swiperList);
	},
	doorIntrgralList({ commit }, doorIntrgralList) {
	    commit('SET_DOOR_INTRGRAL_LIST', doorIntrgralList);
	},
	villageData({ commit }, villageData) {
	    commit('SET_VILLAGE_DATA', villageData);
	},
	selectedFamilyData({ commit }, selectedFamilyData) {
	    commit('SET_SELECTED_FAMILYDATA', selectedFamilyData);
	},
	refreshComponent({ commit }, refreshComponent) {
	    commit('SET_REFRESH_COMPONENT', refreshComponent);
	},
  },
  getters: {
	 loginParam: (state) => {
	     return state.loginParam
	 },
     loginData: (state) => {
         return state.loginData
     },
	 messages:(state) => {
	     return state.message
	 },
	 swiperList:(state) => {
	     return state.swiperList
	 },
	 doorIntrgralList:(state) => {
	     return state.doorIntrgralList
	 },
	 villageData:(state) => {
	     return state.villageData
	 },
	 selectedFamilyData:(state) => {
	     return state.selectedFamilyData
	 },
	 refreshComponent:(state) => {
	     return state.refreshComponent
	 }
  },
  modules: {}
});

 