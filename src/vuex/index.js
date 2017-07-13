import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const  moudle1 = {
	state: {
		history : 0
	}
}

export default new Vuex.Store({
	modules :{
		m1 : moudle1
	}
})
