import hyRequest from '@/service'

const token = localStorage.getItem('token')

export function postUsersListData(queryInfo) {
  const page = queryInfo.offset
  const pageSize = queryInfo.size

  const url = `/user/page?page=${page}&pageSize=${pageSize}`
  console.log(queryInfo)
  console.log(page, pageSize)
  console.log('我看看这是不是普通分页查询', url)

  return hyRequest.get({
    url: url,
    headers: {
      token: `${token}`
    }
  })
}

export function getUsersListDataWithConditions(queryInfo) {
  const url = '/user/limit'
  const data = {
    page: queryInfo.offset,
    pageSize: queryInfo.size,
    id: queryInfo.id,
    name: queryInfo.username,
    status: queryInfo.enable
  }

  if (queryInfo.id) {
    data.id = parseInt(queryInfo.id)
  }
  if (queryInfo.username) {
    data.name = queryInfo.username
  }
  if (queryInfo.enable) {
    data.status = parseInt(queryInfo.enable)
  }

  console.log('我看看有没有值', data)
  console.log('我看看这是不是条件分页查询', url)

  return hyRequest.post({
    url: url,
    data: data,
    headers: {
      token: `${token}`
    }
  })
}
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/user/delete/${id}`,
    headers: {
      token: `${token}`
    }
  })
}

export function newUserData(data: any) {
  return hyRequest.post({
    url: `/user/save`,
    data: data,
    headers: {
      token: `${token}`
    }
  })
}

export function editUserDdata(data: any) {
  return hyRequest.patch({
    url: `/user/update`,
    data: data,
    headers: {
      token: `${token}`
    }
  })
}
