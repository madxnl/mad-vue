import * as filters from './filters'

export default {
  install(Vue, config) {

    const components = [
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
    ]


    for (let name in filters) {
      Vue.filter(name, filters[name])
    }

    for (let component of components) {
      Vue.component(`Mad${component}`, require(`./components/${component}`).default)
    }

    const messagesDiv = document.createElement('div')
    document.body.appendChild(messagesDiv)
    const Messages = Vue.component('MadMessages')

    Vue.$mad = Vue.prototype.$mad = {
      message: new Messages({ el: messagesDiv }),
      filters,
    }

    Vue.config.errorHandler = Vue.config.errorHandler || (err => {
      console.error(err)
      Vue.$mad.message.error(err)
    })

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
