import message from './modules/message'
import * as filters from './filters'

export default {
  install(Vue, config) {

    config = Object.assign({}, {
      components: [
        'Button',
        'Checkbox',
        'Datatable',
        'Dropdown',
        'Form',
        'FormItem',
        'Icon',
        'Input',
        'InputCurrency',
        'InputDate',
        'InputFile',
        'Loading',
        'Messages',
        'Menu',
        'MenuItem',
        'Modal',
        'Select',
        'Tab',
        'Tabs',
        'Transition',
      ],
    }, config)

    Vue.$mad = Vue.prototype.$mad = {
      message: message(Vue, config),
      filters,
    }

    Vue.config.errorHandler = Vue.config.errorHandler || (err => {
      console.error(err)
      Vue.$mad.message.error(err)
    })
    
    for (let name in filters) {
      Vue.filter(name, filters[name])
    }

    for (let component of config.components || components) {
      Vue.component(`Mad${component}`, require(`./components/${component}`).default)
    }
    
    const keydown = e => {
      if (e.keyCode == 9) window.document.body.classList.add('show-focus-outline')
    }
    const mousedown = e => {
      window.document.body.classList.remove('show-focus-outline')
    }
    addEventListener('keydown', keydown)
    addEventListener('mousedown', mousedown)

  },
}
