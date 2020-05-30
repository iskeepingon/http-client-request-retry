## 安装

```
npm install httpClientRequestRetry --save
```

## 用法

语法

```
httpClientRequestRetry(promise, totalCount, millisecond)
```

参数

| 参数 | 描述 |
| :-----| :---- |
| promise | Promise实例 |
| totalCount | 请求次数 |
| millisecond | 请求时间间隔，单位是ms |

返回

| TYPE | 描述 |
| :-----| :---- |
| Promise实例 | 返回一个Promise实例 |

## 例子

```
import httpClientRequestRetry from 'httpClientRequestRetry'

/**
 * @function 模拟请求函数
 * @returns {Promise<any>}
 */
function query() {
  return new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * 10)
    console.log(1)
    setTimeout(() => {
      if (random > 5) {
        resolve({code: 0, msg: '成功'})
      } else {
        reject({code: 1, msg: '失败'})
      }
    }, 1000)
  })
}

/**
 * @function 发起一个请求，最多请求五次，如果五次还不成功，就结束
 */
httpClientRequestRetry(query, 5, 1000)
  .then((res) => {
    console.log(res)
  }).catch((err) => {
  console.log(err)
})

```