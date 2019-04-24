
require('../scss/main.scss')

const filters = require('./filters')

const Button = require('../components/button/Button.vue').default
const Checkbox = require('../components/checkbox/Checkbox.vue').default
const Datatable = require('../components/datatable/Datatable.vue').default
const Dropdown = require('../components/dropdown/Dropdown.vue').default
const Form = require('../components/form/Form.vue').default
const FormItem = require('../components/form-item/FormItem.vue').default
const Icon = require('../components/icon/Icon.vue').default
const Input = require('../components/input/Input.vue').default
const InputNumber = require('../components/input-number/InputNumber.vue').default
const InputDate = require('../components/input-date/InputDate.vue').default
const InputFile = require('../components/input-file/InputFile.vue').default
const InputImage = require('../components/input-image/InputImage.vue').default
const Loading = require('../components/loading/Loading.vue').default
const Message = require('../components/message/Message.vue').default
const Modal = require('../components/modal/Modal.vue').default
const Select = require('../components/select/Select.vue').default
const Tabs = require('../components/tabs/Tabs.vue').default
const Transition = require('../components/transition/Transition.vue').default

const Messages = require('./Messages').default
const Theme = require('./Theme').default

export default {
  install(Vue, config = {}) {
    Vue.component(`MadButton`, Button)
    Vue.component(`MadCheckbox`, Checkbox)
    Vue.component(`MadDatatable`, Datatable)
    Vue.component(`MadDropdown`, Dropdown)
    Vue.component(`MadForm`, Form)
    Vue.component(`MadFormItem`, FormItem)
    Vue.component(`MadIcon`, Icon)
    Vue.component(`MadInput`, Input)
    Vue.component(`MadInputNumber`, InputNumber)
    Vue.component(`MadInputDate`, InputDate)
    Vue.component(`MadInputFile`, InputFile)
    Vue.component(`MadInputImage`, InputImage)
    Vue.component(`MadLoading`, Loading)
    Vue.component(`MadMessage`, Message)
    Vue.component(`MadModal`, Modal)
    Vue.component(`MadSelect`, Select)
    Vue.component(`MadTabs`, Tabs)
    Vue.component(`MadTransition`, Transition)

    for (let name in filters) {
      Vue.filter(name, filters[name])
    }

    const theme = new Vue(Theme)

    Vue.$mad = Vue.prototype.$mad = {
      message: new Vue(Messages),
      theme,
      filters,
    }

    if (config.theme) {
      theme.applyTheme(config.theme)
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
