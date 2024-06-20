import hyRequest from '..'

export function accountRegRequest(account: {
  username: string
  password: string
  rePassword: string
  email: string
}) {
  return hyRequest.post({
    url: '/user/register',
    data: account
  })
}
