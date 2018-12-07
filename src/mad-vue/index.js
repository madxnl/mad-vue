import message from './message'
import * as filters from './filters'
import './directives'

export default {
  install(Vue, config) {

    Vue.$mad = Vue.prototype.$mad = {
      message,
      filters,
    }

    if (!Vue.config.errorHandler) {
      Vue.config.errorHandler = err => {
        console.error(err)
        message.error(err)
      }
    }
    
    for (let name in filters) {
      Vue.filter(name, filters[name])
    }

    const components = [
      'Button',
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
    ]

    for (let component of components) {
      Vue.component(`Mad${component}`, require(`./components/${component}`).default)
    }

    // focus outlines enabled when using tab key
    window.addEventListener('keydown', e => {
      if (e.keyCode == 9) window.document.body.classList.add('show-focus-outline')
    })
    window.addEventListener('mousedown', () => {
      window.document.body.classList.remove('show-focus-outline')
    })
    

  }
}
