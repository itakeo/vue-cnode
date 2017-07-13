import Vue from 'vue'
import Router from 'vue-router'
//import Info from '@/components/Info'
import conList from '@/components/contentList'
import userInfo from '@/components/userInfo'

//按需加载
let Info = (resolve )=>{
	return require.ensure([],()=>{
		resolve(require('@/components/Info'))
	})
}
Vue.use(Router)
export default new Router({

	routes: [
		{
			path: '/user',
			component: userInfo
		},
		{
			path: '/info',
			component: Info
		},
		{
			path: '*',
			component: conList
		}
	]
})
