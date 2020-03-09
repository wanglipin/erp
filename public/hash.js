/**
 * @param this =  self 
 * self 代表this
*/
// 引入md5
self.importScripts('./spark-md5.min.js')

console.log('<进入了hash>')
self.onmessage = e => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  // 计算hash
  const loadNext = index => {
    const reader = new FileReader() // 文件阅读对象到内存
    reader.readAsArrayBuffer(fileChunkList[index].file); // 读完就触发onload
    reader.onload = e => {// 事件
      count++;
      spark.append(e.target.result)
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close()// 关闭Workers,回收内存
      } else {
        // 还没有读完
        percentage += 100 / fileChunkList.length; // 这里告诉外边读取了多少
        self.postMessage({
          percentage
        })
        loadNext(count)
      }
    }
  }
  loadNext(0)
}