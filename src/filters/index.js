import moment from 'moment'

export function timeType (value) {
  return moment(value).format('YYYY-MMM-DD')
}
export function statusFilter (status) {
  const statusMap = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}
export function tansformByte (value) {
  return Number(value/1024).toFixed(0)
}
