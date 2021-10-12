import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

// const GroupVuxInfo = (resolve) => {
//   import('components/editInfo/groupVuxInfo').then((module) => {
//     resolve(module)
//   })
// }
export const route = [{
	path: '/',
	redirect: '/home'
},
{
	path: '/home',
	name: 'home',
	component: resolve => require(['views/main/home'], resolve),
	children: [{
		path: '/home/4041',
		component: resolve => require(['components/common/errorPage/404'], resolve),
	},
	{
		//网格联动
		path: '/home/wggl',
		component: resolve => require(['views/business/zhxz/wggl'], resolve),
	},
	{
		path: '/home/jbgk',
		component: resolve => require(['views/business/zhxz/jbgk'], resolve),
	},
	{
		//智慧党建
		path: '/home/djyl',
		component: resolve => require(['views/business/zhxz/djyl'], resolve),
	},
	{
		//行政审批
		path: '/home/xzsp',
		component: resolve => require(['views/business/zhxz/xzsp'], resolve),
	},
	{
		//综合执法
		path: '/home/zhzf',
		component: resolve => require(['views/business/zhxz/zfptnew'], resolve),
		//component: resolve => require(['views/business/zhxz/zhzf'], resolve),
	},
	{
		//综合执法
		path: '/home/zhpt',
		component: resolve => require(['views/business/zhxz/zfptnew'], resolve),
	},
	{
		//指挥调度
		path: '/home/zhdd',
		component: resolve => require(['views/business/zhxz/zhdd'], resolve),
	},
	{
		//经济运行
		path: '/home/jjfz',
		component: resolve => require(['views/business/zhxz/jjfz'], resolve),
	},
	{
		//住枫桥
		path: '/home/zfq',
		component: resolve => require(['views/business/zhxz/zfq'], resolve)
	},
	{
		//智能监管
		path: '/home/znjg',
		component: resolve => require(['views/business/zhxz/znjg'], resolve),
	},
	]
},
{
	path: '/yw/:id',
	name: 'yw',
	component: resolve => require(['views/business/yw'], resolve),
	children: [{
		path: '/yw/wntjfx',
		component: resolve => require(['views/business/yw/wntjfx'], resolve),
	}, {
		path: '/yw/hw',
		component: resolve => require(['views/business/yw/hw'], resolve),
	}, {
		path: '/yw/rckc',
		component: resolve => require(['views/business/yw/rckc'], resolve),
	}, {
		path: '/yw/yl',
		component: resolve => require(['views/business/yw/yl'], resolve),
	}, {
		path: '/yw/wg',
		component: resolve => require(['views/business/yw/wg'], resolve),
	},
	{
		path: '/yw/djyl',
		component: resolve => require(['views/business/yw/djyl'], resolve),
	},
	{
		path: '/yw/xse',
		component: resolve => require(['views/business/yw/xse'], resolve),
	}, {
		path: '/yw/hjjc',
		component: resolve => require(['views/business/yw/hjjc'], resolve),
	}, {
		path: '/yw/xf331',
		component: resolve => require(['views/business/yw/xf331'], resolve),
	}
	]
},
]
var router = new Router({
	// mode: 'history',
	// base: process.env.BASE_URL,
	mode: 'hash',
	routes: route,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop
			}
			return {
				x: 0,
				y: to.meta.savedPosition || 0
			}
		}
	},
})
export default router