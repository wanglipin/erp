import axios from 'axios';
import Vue from 'vue'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress';
import qs from 'qs';
import 'nprogress/nprogress.css';
import ElementUI, {
  Notification,
  MessageBox,
  Loading
} from 'element-ui'
Vue.use(ElementUI, {
  size: 'small'
})
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  508: '获取用户信息失败'
};
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'BsmAjaxHeader': true
  }, // 表单传递
  timeout: 20000,
  withCredentials: true,// 设置axios可以携带cookie
});
let loadingService = '';
// 请求完成回调
const finishCallback = function () {

  loadingService && loadingService.close();
  loadingService && loadingService.close();
  NProgress.done();
};
  // 报错处理
const handleError = function (response) {
  const errorText = codeMessage[response.status] || response.statusText;
  Notification({
    type: 'error',
    title: `请求错误 ${response.status}: ${response.config.url}`, // (status)看后台给的是什么参数 如code 啊什么的
    message: errorText
  });
  const error = new Error(errorText);
  error.name = response.status; // (status)看后台给的是什么参数 如code 啊什么的
  error.response = response;
  throw error;
};
axiosInstance.interceptors.request.use(config => {
  let options = config.data || {}; // options 也是根据后台,看后台给的是什么
  if (!options.loadingHide) {
    NProgress.start();
  }
  if (options.abort) {
    loadingService = Loading.service();
  }
  if (config.method === 'get') {
    // 清除get缓存
    config.url = `${config.url}?t=${new Date().getTime()}`;
    // config.params = config.data;
    // delete config.data;
  } else {
    config.data = qs.stringify(config.data || {});
  }
  // if (store.getters.token) { // moke的时候使用的
  //   config.headers['X-Token'] = getToken()
  // }
  return config;
}, error => {
  return Promise.reject(error);
})
axiosInstance.interceptors.response.use(data => {
  finishCallback();
  let responseData = data.data; // 这里的data 是根据后台返回来的数据.
  let options = data.config.options || {};// options 也是看后台怎么定义
  if (!responseData.success) { // success也是根据后台,后台如果是code 那就是code
    if (responseData.status === 401 || responseData.status === 509) {
      MessageBox('您已被登出，可以取消继续停留在当前页面，或者重新登录 ', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        location.href = '/#/login';
      });
    } else if (!options.ignoreError) {
      Notification({
        message: responseData.message, // message后台返回的数据,也是根据返回的字段更换
        type: 'error'
      });
    }
  }
  return responseData;
}, error => {
  finishCallback();
  handleError(error.response);
  return Promise.reject(error);
});
export default axiosInstance;
