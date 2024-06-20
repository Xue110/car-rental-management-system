import hyRequest from '..'

export function getMessageData() {
  const idString = localStorage.getItem('id')
  if (idString) {
    const id = parseInt(idString, 10)
    if (!isNaN(id)) {
      return hyRequest.get({
        url: `/user/getUserById/${id}`
      })
    } else {
      // 处理无效的 id 值
      return Promise.reject(new Error('Invalid id value'))
    }
  } else {
    // 处理 localStorage 中没有 'id' 的情况
    return Promise.reject(new Error('No id value in localStorage'))
  }
}
