import hyRequest from '@/service'

const token = localStorage.getItem('token')

export function getCarsListData(queryInfo) {
  const page = queryInfo.offset
  const pageSize = queryInfo.size

  const url = `/car/page?page=${page}&pageSize=${pageSize}`

  console.log(queryInfo)
  console.log(page, pageSize)
  console.log(url)

  return hyRequest.get({
    url: url,
    headers: {
      token: `${token}`
    }
  })
}

export function getCarsLimitListData(queryInfo) {
  const page = queryInfo.offset
  const pageSize = queryInfo.size

  const data = {
    page,
    pageSize,
    id: queryInfo.id,
    name: queryInfo.name,
    category: queryInfo.category,
    status: queryInfo.status
  }

  // 检查每个属性是否有值，有值则添加到 data 中
  if (queryInfo.id) {
    data.id = parseInt(queryInfo.id)
  }
  if (queryInfo.name) {
    data.name = queryInfo.name
  }
  if (queryInfo.category) {
    data.category = parseInt(queryInfo.category)
  }
  if (queryInfo.status) {
    data.status = parseInt(queryInfo.status)
  }

  const url = '/car/limit'
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

export function deleteCarById(id: number) {
  return hyRequest.delete({
    url: `/car/delete/${id}`,
    headers: {
      token: `${token}`
    }
  })
}

export function newCarData(data: any) {
  return hyRequest.post({
    url: `/car/save`,
    data: data,
    headers: {
      token: `${token}`
    }
  })
}

export function editCarDdata(data: any) {
  return hyRequest.patch({
    url: `/car/update`,
    data: data,
    headers: {
      token: `${token}`
    }
  })
}
