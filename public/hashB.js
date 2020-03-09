/**
 * @param this =  self 
 * self 代表this
*/
self.onmessage = e => {
  self.postMessage({
    'mas': '你好'
  })
}