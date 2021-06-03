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
