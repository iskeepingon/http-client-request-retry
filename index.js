/**
 * @function 延迟函数
 * @param millisecond {number} 延迟间隔
 * @returns {Promise<any>}
 * @private
 */
function _delay(millisecond = 1000) {
    // 延迟millisecond
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve()
        }, millisecond)
    })
}

/**
 * @function 递归函数
 * @param promise {Promise<any>}
 * @param resolve
 * @param reject
 * @param count {number} 第几次请求
 * @param totalCount {number} 请求次数
 * @private
 */
function _recursion(promise, resolve, reject, count, totalCount, millisecond) {
    _delay(millisecond).then(() => {
        promise().then((res) => {
            resolve(res)
        }).catch((err) => {
            if (count >= totalCount) {
                reject(err)
                return
            }
            _recursion(promise, resolve, reject, count + 1, totalCount, millisecond)
        })
    })
}

/**
 * @function 请求重试函数
 * @param promise {Promise<any>}
 * @param totalCount {number} 请求次数
 * @param millisecond {number} 毫秒
 * @returns {Promise<any>}
 */
function httpClientRequestRetry(promise, totalCount, millisecond) {
    return new Promise((resolve, reject) => {
        let count = 1
        promise().then((res) => {
            resolve(res)
        }).catch((err) => {
            if (count >= totalCount) {
                reject(err)
                return
            }
            _recursion(promise, resolve, reject, count + 2, totalCount, millisecond)
        })
    })
}

export default httpClientRequestRetry