/**
 * mock data
 */
import Mock from 'mockjs'

Mock.mock(/is-login/, {
  'code': 0,
  'data': {
    'is_login': true
  },
  'message': ''
})
