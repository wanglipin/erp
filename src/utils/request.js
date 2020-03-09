 // xhr
 export function request({
  url,
  method = "post",
  data,
  headers = {},
  onProgress = e => e,
  requestList
}) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.upload.onprogress = onProgress;
    Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.send(data);
    xhr.onload = e => {
      // 这块是断点续传的核心
      if (requestList) {
        // xhr已经完成了
        const xhrIndex = requestList.findIndex(item => {
          item === xhr
        })
        requestList.splice(xhrIndex, 1) // 删除当前load完的
      }
      resolve({
        data: e.target.response
      });
    };
    if (requestList) {
      requestList.push(xhr)
    }
  });
}