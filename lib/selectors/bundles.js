import get from 'lodash/get'

export default function (state) {
  return get(state, 'region.bundles', [])
}
