import hyRequest from '@/service'

export function getAmountListData() {
  return hyRequest.get({
    url: '/amount/list'
  })
}
export function getCardData() {
  return hyRequest.get({
    url: '/car/totalCar'
  })
}
export function getLineData() {
  return hyRequest.get({
    url: '/car/line'
  })
}
export function getCylinderData() {
  return hyRequest.get({
    url: '/car/totalCar'
  })
}
export function getRingData() {
  return hyRequest.get({
    url: '/car/carCategory'
  })
}
export function getRoseData() {
  return hyRequest.get({
    url: '/user/totalUser'
  })
}
