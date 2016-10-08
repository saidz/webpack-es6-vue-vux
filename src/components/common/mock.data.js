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

Mock.mock(/insures/, {
  'code': 0,
  'data': {
    'companys': [{
      'id': 1,
      'name': '\u4e2d\u56fd\u4eba\u6c11\u8d22\u4ea7\u4fdd\u9669\u80a1\u4efd\u6709\u9650\u516c\u53f8'
    }, {
      'id': 2,
      'name': '\u4e2d\u56fd\u5e73\u5b89\u4fdd\u9669\u80a1\u4efd\u6709\u9650\u516c\u53f8'
    }, {
      'id': 3,
      'name': '\u4e2d\u56fd\u592a\u5e73\u6d0b\u4fdd\u9669\u80a1\u4efd\u6709\u9650\u516c\u53f8'
    }],
    'insures': [{
      'category': '\u5546\u4e1a\u9669',
      'id': 1,
      'is_force': false,
      'name': '\u7b2c\u4e09\u8005\u8d23\u4efb\u9669\uff0850\u4e07\uff09'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 2,
      'is_force': false,
      'name': '\u8f66\u4e0a\u4eba\u5458\u8d23\u4efb\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 3,
      'is_force': false,
      'name': '\u8f66\u8f86\u635f\u5931\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 4,
      'is_force': false,
      'name': '\u76d7\u62a2\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 6,
      'is_force': false,
      'name': '\u4e0d\u8ba1\u514d\u8d54\u7279\u7ea6\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 7,
      'is_force': false,
      'name': '\u81ea\u7136\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 8,
      'is_force': false,
      'name': '\u65b0\u589e\u8bbe\u5907\u635f\u5931\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 9,
      'is_force': false,
      'name': '\u7cbe\u795e\u635f\u5bb3\u8d54\u507f\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 10,
      'is_force': false,
      'name': '\u8f66\u8eab\u5212\u75d5\u9669'
    }, {
      'category': '\u5546\u4e1a\u9669',
      'id': 11,
      'is_force': false,
      'name': '\u53d1\u52a8\u673a\u635f\u5931\u7279\u7ea6\u9669'
    }, {
      'category': '\u4ea4\u5f3a\u9669',
      'id': 12,
      'is_force': true,
      'name': '\u4ea4\u5f3a\u9669'
    }, {
      'category': '\u8f66\u8239\u7a0e',
      'id': 13,
      'is_force': true,
      'name': '\u8f66\u8239\u7a0e'
    }],
    'mobile': '13811992070'
  },
  'message': 'ok'
})

Mock.mock(/10\/inquiry-insure/, {
  'code': 0,
  'data': {},
  'message': 'ok'
})

