import moment from 'moment'

export function timeType (value) {
  return moment(value).format('YYYY-MMM-DD')
}

