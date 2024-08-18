import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/front/home'
  },

  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/Front.vue'),
    redirect: '/front/home',
    children: [
      { path: 'home', name: 'FHome', meta: { name: '系统首页' }, component: () => import('../views/front/Home') },
      { path: 'person', name: 'Person', meta: { name: '个人信息' }, component: () => import('../views/front/Person') },
      { path: 'blogDetail', name: 'BlogDetail', meta: { name: '博客详情' }, component: () => import('../views/front/BlogDetail') },
      { path: 'activityCenter', name: 'ActivityCenter', meta: { name: '活动中心' }, component: () => import('../views/front/ActivityCenter') },
      { path: 'activityDetail', name: 'ActivityDetail', meta: { name: '活动详情' }, component: () => import('../views/front/ActivityDetail') },
      { path: 'newBlog', name: 'newBlog', meta: { name: '新建博客' }, component: () => import('../views/front/newBlog.vue') },
      { path: 'blogSort', name: 'BlogSort', meta: { name: '博客分类' }, component: () => import('../views/front/BlogSort.vue') },
      { path: 'about', name: 'About', meta: { name: '关于' }, component: () => import('../views/front/About.vue') },
    ]
  },


  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/Manager.vue'),
    redirect: '/manager/home',  // 重定向到后台主页
    children: [
      { path: '403', name: 'NoAuth', meta: { name: '无权限' }, component: () => import('../views/manager/403') },
      { path: 'home', name: 'Home', meta: { name: '系统首页' }, component: () => import('../views/manager/Home') },
      { path: 'admin', name: 'Admin', meta: { name: '管理员信息' }, component: () => import('../views/manager/Admin') },
      { path: 'adminPerson', name: 'AdminPerson', meta: { name: '个人信息' }, component: () => import('../views/manager/AdminPerson') },
      { path: 'password', name: 'Password', meta: { name: '修改密码' }, component: () => import('../views/manager/Password') },
      { path: 'notice', name: 'Notice', meta: { name: '公告信息' }, component: () => import('../views/manager/Notice') },
      { path: 'user', name: 'User', meta: { name: '用户信息' }, component: () => import('../views/manager/User.vue') },
      { path: 'category', name: 'Category', meta: { name: '博客分类' }, component: () => import('../views/manager/Category.vue') },
      { path: 'blog', name: 'Blog', meta: { name: '博客信息' }, component: () => import('../views/manager/Blog.vue') },
      { path: 'blogDemo', name: 'BlogDemo', meta: { name: '博客Demo' }, component: () => import('../views/manager/BlogDemo.vue') },
      { path: 'activity', name: 'Activity', meta: { name: '活动信息' }, component: () => import('../views/manager/Activity.vue') },
      { path: 'activitySign', name: 'ActivitySign', meta: { name: '活动报名' }, component: () => import('../views/manager/ActivitySign.vue') },
      { path: 'comment', name: 'Comment', meta: { name: '评论信息' }, component: () => import('../views/manager/Comment.vue') },
    ]
  },


  { path: '/login', name: 'Login', meta: { name: '登录' }, component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', meta: { name: '注册' }, component: () => import('../views/Register.vue') },
  { path: '*', name: 'NotFound', meta: { name: '无法访问' }, component: () => import('../views/404.vue') },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//     // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
//     location.reload();
//     router.replace(targetPath);
//   }
// });

/* 正则使用'\S'而不是'\d' 为了适配写魔法注释的朋友，写'\d'遇到魔法注释就匹配不成功了。
 * 使用reload方法而不是replace原因是replace还是去请求之前的js文件，会导致循环报错。
 * reload会刷新页面， 请求最新的index.html以及最新的js路径。
 * 直接修改location.href或使用location.assign或location.replace，和router.replace同理， 
 * 在当前场景中请求的依然是原来的js文件，区别仅有浏览器的历史栈。因此必须采用reload.
 * reload()有个特点是当你在A页面试图进入B页面的时候报错，会在A页面刷新，因此在刷新后需要手动书写逻辑
 * 进入B页面，可以在router.onReady()方法里面书写
 * 为了避免在特殊情况下服务器丢失资源导致无限报错刷新，做了一步控制，仅尝试一次进入B页面，
 * 如果不成功就只刷新A页面，停留在当前的A页面。
 */


router.onError((error) => {
  const jsPattern = /Loading chunk (\S)+ failed/g
  const cssPattern = /Loading CSS chunk (\S)+ failed/g
  const isChunkLoadFailed = error.message.match(jsPattern || cssPattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    localStorage.setItem('targetPath', targetPath)
    window.location.reload()
  }
})

router.onReady(() => {
  const targetPath = localStorage.getItem('targetPath')
  const tryReload = localStorage.getItem('tryReload')
  if (targetPath) {
    localStorage.removeItem('targetPath')
    if (!tryReload) {
      router.replace(targetPath)
      localStorage.setItem('tryReload', true)
    } else {
      localStorage.removeItem('tryReload')
    }
  }
})





// 注：不需要前台的项目，可以注释掉该路由守卫
// 路由守卫
router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem("ADMIN") || localStorage.getItem("USER") || '{}');
  console.log('当前路由:', to.path);
  console.log('用户角色:', user.role);
  if (to.path === '/') {
    if (user.role) {
      if (user.role === 'ADMIN') {
        next('/manager/home')
      } else {
        next('/login')
      }
    } else {
      next('/front/home')
    }
  } else {
    next()
  }
  // let user = JSON.parse(localStorage.getItem("ADMIN") || '{}');
  // if (!user.role) {
  //   next('/front/home'); // 如果用户没有角色信息，重定向到'/front/home'
  // } else if (user.role === 'ADMIN') {
  //   next('/manager/home'); // 如果用户是管理员，重定向到'/manager/home'
  // } else {
  //   next(); // 其他情况不进行重定向
  // }
})

export default router
