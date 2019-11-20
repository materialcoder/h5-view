/**
 * 生成UUID方法
 * @returns {string}
 */
export const createUUID = () => {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now() === 'function') {
    d += performance.now()
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString()
  })
  return uuid
}

export const deepClone = (obj, cache= []) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // 如果传入的对象与缓存的相等，则递归结束，防止死循环
  /**
   * 类似下面这样
   * var a = {b: 1}
   * a.c = a
   */
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // 将copy首先放入cache，因为我们需要在递归deepCopy时引用它
  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => {
    copy[key] = deepClone(obj[key], cache)
  })
  return copy
}