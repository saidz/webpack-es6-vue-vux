import Vue from 'vue'
import VueResource from 'vue-resource'
import 'src/components/common/mock.data'
import Index from 'src/components/inquiries/index'

Vue.use(VueResource)

describe('inquiries/Index.vue', () => {
  it('should render', () => {
    const vm = new Vue(Index).$mount()
    console.log(vm.data, '>>.')
    expect(vm.isLogin).to.be.ok
  })
})

