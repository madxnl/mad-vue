import * as filters from './filters'
import Messages from './Messages'

export default {
  install(Vue, config) {
    Vue.component(`MadButton`, require('@/components/button/Button.vue').default)
    Vue.component(`MadCheckbox`, require('@/components/checkbox/Checkbox.vue').default)
    Vue.component(`MadDatatable`, require('@/components/datatable/Datatable.vue').default)
    Vue.component(`MadDropdown`, require('@/components/dropdown/Dropdown.vue').default)
    Vue.component(`MadForm`, require('@/components/form/Form.vue').default)
    Vue.component(`MadFormItem`, require('@/components/form-item/FormItem.vue').default)
    Vue.component(`MadIcon`, require('@/components/icon/Icon.vue').default)
    Vue.component(`MadInput`, require('@/components/input/Input.vue').default)
    Vue.component(`MadInputNumber`, require('@/components/input-number/InputNumber.vue').default)
    Vue.component(`MadInputDate`, require('@/components/input-date/InputDate.vue').default)
    Vue.component(`MadInputFile`, require('@/components/input-file/InputFile.vue').default)
    Vue.component(`MadInputImage`, require('@/components/input-image/InputImage.vue').default)
    Vue.component(`MadLoading`, require('@/components/loading/Loading.vue').default)
    Vue.component(`MadMessage`, require('@/components/message/Message.vue').default)
    Vue.component(`MadModal`, require('@/components/modal/Modal.vue').default)
    Vue.component(`MadSelect`, require('@/components/select/Select.vue').default)
    Vue.component(`MadTabs`, require('@/components/tabs/Tabs.vue').default)
    Vue.component(`MadTransition`, require('@/components/transition/Transition.vue').default)

    for (let name in filters) {
      Vue.filter(name, filters[name])
    }

    Vue.$mad = Vue.prototype.$mad = {
      message: new Vue(Messages),
      filters,
    }

    Vue.config.errorHandler = Vue.config.errorHandler || (err => {
      console.error(err)
      Vue.$mad.message.error(err)
    })

    const keydown = e => {
      if (e.keyCode === 9) window.document.body.classList.add('show-focus-outline')
    }
    const mousedown = e => {
      window.document.body.classList.remove('show-focus-outline')
    }
    addEventListener('keydown', keydown)
    addEventListener('mousedown', mousedown)
  },
}
