import {RouteTo} from 'lib/constants'

export function routeTo(to, props) {
  const href = RouteTo[to]
  if (!href) return console.error(`${to} is not a valid RouteTo route!`)
  const {query, as} = hrefToAs(href, props)
  return {as, href, query}
}

export function hrefToAs(str, obj) {
  if (!obj) return str
  const query = {}
  Object.keys(obj).forEach((k) => {
    const key = `[${k}]`
    if (str.includes(key)) {
      str = str.replace(`[${k}]`, obj[k])
    } else {
      query[k] = obj[k]
    }
  })
  const qsKeys = Object.keys(query)
  if (qsKeys.length > 0) {
    str += '?' + qsKeys.map((k) => `${k}=${query[k]}`).join('&')
  }
  return {query, as: str}
}
