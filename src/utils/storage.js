// 封装一个存储模块
const tokenKet = 'hm-mobile-82-token'

// 1. 设置 token
export const setToken = (tokenObj) => {
  localStorage.setItem(tokenKet, JSON.stringify(tokenObj))
}

// 2. 获取 token
export const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenKet))
}

// 3. 移出 token
export const removeToken = () => {
  localStorage.removeItem(tokenKet)
}

/* 搜索历史本地存储 */
const historyKey = 'hm-modile-82-history'
// 1. 设置 history 历史记录
export const setHistory = (arr) => {
  return localStorage.setItem(historyKey, JSON.stringify(arr))
}

// 2. 获取 history 历史记录
export const getHistory = () => {
  return JSON.parse(localStorage.getItem(historyKey))
}

// 3. 移除 history 历史记录
export const removeHistory = () => {
  return localStorage.removeItem(historyKey)
}
