// import config from 'config'
// import Vue from 'vue'
import axios from 'axios'
// Vue.prototype.$fetch = instance
import qs from 'qs'

const instance = axios.create({
  baseURL: 'http://39.104.64.179:8088', // api的base_url http://39.104.64.179:8088
  timeout: 10000, // 请求超时时间
  // transformRequest: data => qs.stringify(data)
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }

});
// 添加请求拦截器
const storage = window.localStorage;
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    // 序列化
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
// 最后暴露实例
export default instance
