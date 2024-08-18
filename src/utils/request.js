import axios from 'axios'
import router from "@/router";
import store from '@/store';

// 创建可一个新的axios对象
const request = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,   // 后端的接口地址  ip:port
    timeout: 60000                          // 30s请求超时
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';        // 设置请求头格式
    // let user = JSON.parse(localStorage.getItem("xm-user") || '{}')  // 获取缓存的用户信息
    let user = JSON.parse(localStorage.getItem(userRoleKey()) || '{}')  // 获取缓存的用户信息
    config.headers['token'] = user.token  // 设置请求头

    return config
}, error => {
    console.error('request error: ' + error) // for debug
    return Promise.reject(error)
});

// 根据用户角色直接返回对应的 localStorage 键名
function userRoleKey() {
    let user = JSON.parse(localStorage.getItem("ADMIN") || '{}');
    return user.role === 'ADMIN' ? 'ADMIN' : 'USER';
}

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;

        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code === '401') {
            // router.push('/login')
            console.log("from request", res.code)
            // router.push('/front/home')
            store.commit("loadCurrentUser", {});
            localStorage.removeItem("USER");
            store.commit("loadCurrentAdmin", {});
            localStorage.removeItem("ADMIN");
            router.push("/front/person");
        }
        return res;
    },
    error => {
        console.error('response error: ' + error) // for debug
        return Promise.reject(error)
    }
)


export default request