import Toast from 'vux/src/components/toast'
export default {
  components: {
    Toast
  },
  data () {
    return {
      toastShow: false,
      toastTxt: '',
      toastTime: 1000
    }
  },
  methods: {
    showToast (txt, time) {
      this.toastShow = true
      this.toastTxt = txt
      if (time) {
        this.toastTime = time
      }
    }
  }
}
