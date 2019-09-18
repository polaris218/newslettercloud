import { createSelector } from 'reselect'
import get from 'lodash/get'

export const F_PUBLIC = 2 ** 0
export const F_PROTECTED = 2 ** 1
export const F_UNAUTHORISED = 2 ** 2



// export const
// NOTE F_CHIEF have full access to application
// should contains all flags. the value should be next exponent minus one
// NOTE the maximum exponent can be 52, because the MAX_SAFE_INTEGER is (2 ** 53)
// const F_CHIEF            = 2 ** 52 - 1

export const userLevelSelector = createSelector(
  // base permissions
  (state) => !get(state, 'resource.session.data.token') ? F_UNAUTHORISED : F_PROTECTED,
// collect all user permissions
  (...args) => args.reduce((level, flag) => level | flag, F_PUBLIC)
)
