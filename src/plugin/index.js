
require('../scss/main.scss')

const filters = require('./filters')

const Button = require('../components/Button').default
const Checkbox = require('../components/Checkbox').default
const Datatable = require('../components/Datatable').default
const Dropdown = require('../components/Dropdown').default
const Form = require('../components/Form').default
const FormItem = require('../components/FormItem').default
const Icon = require('../components/Icon').default
const Input = require('../components/Input').default
const InputNumber = require('../components/InputNumber').default
const InputDate = require('../components/InputDate').default
const InputFile = require('../components/InputFile').default
const InputImage = require('../components/InputImage').default
const Loading = require('../components/Loading').default
const Message = require('../components/Message').default
const Modal = require('../components/Modal').default
const Select = require('../components/Select').default
const Tabs = require('../components/Tabs').default
const Transition = require('../components/Transition').default

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
