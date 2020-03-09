class http {
  /**
   * 
   * @param {*} url 请求参数地址+参数
   * @param {*} header 设置的header头
   * 
   */
  static get({ //static静态访问 不用new request（）即可调用
    url,
    header
  }) {
    let timeOut = new Promise((resolve,reject) => {
      setTimeout(() => {
        let data = {msg:'请求超时'}
        reject(data)
      },10000)
    })
    let getFetch = new Promise((resolve, reject) => {
      // 清除get缓存
      url = `${url}?t=${new Date().getTime()}`
      fetch({
        url,
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-version': version,
        } || header
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {      
            throw `${res.status}, ${res.statusText}`;
          }
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
    return Promise.race([timeOut, getFetch])
    .then(result => {
      return result
    })
  }
  // post方式
  /**
   * 
   * @param {*} url 请求url地址
   * @param {*} header 设置的header头
   * @param {*} data 请求参数
   * 默认以from 形式提交
   * 
   */
  static post({
    url,
    header,
    onProgress, // 上传进度条 
    data
  }) {
    let timeOut = new Promise((resolve,reject) => {
      setTimeout(() => {
        reject(data)
      },10000)
    })
    let postFetch =  new Promise((resolve, reject) => {
      fetch(url, {
          method: 'POST',
          headers: header || {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          credentials: 'include',   //..携带cookie
          body: JSON.stringify(data)
        })
        // .then(res => {
        //   const consume = (reader) => {
        //     var total = 0
        //     console.log('执行上传进度条函数')
        //     return new Promise((resolve, reject) => {
        //       let pump = () => {
        //         reader.read().then(({done, value}) => {
        //           if (done) {
        //             resolve();
        //           }
        //           total += value.byteLength;
        //           console.log(`received ${value.byteLength} bytes (${total} bytes in total)`);
        //           pump();
        //         }).catch(reject)
        //       }
        //       pump();
        //     })
        //   }
        //   if (onProgress) {
        //     consume(res.body.getReader())
        //   } else {
        //     res.json()
        //   }
        // })
        .then(res => res.json())
        .then(data => {
          resolve(data)
        })
        .catch(err => reject(err))
      })
      return Promise.race([timeOut, postFetch])
      .then(result => {
        return result
      })
  }
  //put 修改
  static put({
    url,
    data
  }) {
    let timeOut = new Promise((resolve,reject) => {
      setTimeout(() => {
        let data = {msg:'请求超时'}
        reject(data)
      },10000)
    })
    let putFetch =  new Promise((resolve, reject) => {
      fetch(url, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
    return Promise.race([timeOut, putFetch])
    .then(result => {
      return result
    })
  }
  //delete
  static delete({
    url,
    data
  }) {
    let timeOut = new Promise((resolve,reject) => {
      setTimeout(() => {
        let data = {msg:'请求超时'}
        reject(data)
      },10000)
    })
    let deleteFetch =  new Promise((resolve, reject) => {
      fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => resolve('数据删除成功!'))
        .catch(err => reject(err))
    })
    return Promise.race([timeOut, deleteFetch])
    .then(result => {
      return result
    })
  }
}
export default http;//ES6导出