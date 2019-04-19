<script>
import cssVars from 'css-vars-ponyfill'

const defaultTheme = {
  red: '#F44336',
  pink: '#E91E63',
  purple: '#9C27B0',
  deeppurple: '#673AB7',
  indigo: '#3F51B5',
  blue: '#2196F3',
  lightblue: '#03A9F4',
  cyan: '#00BCD4',
  teal: '#009688',
  green: '#4CAF50',
  lightgreen: '#8BC34A',
  lime: '#CDDC39',
  yellow: '#FFEB3B',
  amber: '#FFC107',
  orange: '#FF9800',
  deeporange: '#FF5722',
  brown: '#795548',
  bluegray: '#607D8B',

  black: '#000000',
  dark: '#424242',
  gray: '#9E9E9E',
  light: '#E0E0E0',
  white: '#FFFFFF',

  primary: 'var(--blue)',
  accent: 'var(--red)',
}

export default {
  data: () => ({
  }),

  created() {
    // window.addEventListener('load', () => {
    //   this.applyTheme()
    // })
    // const observer = new MutationObserver(mutations => {
    //   if (mutations.some(m => m.attributeName === 'style')) {
    //     this.applyTheme()
    //   }
    // })
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: ['style'],
    // })
    this.applyTheme(defaultTheme)
  },

  methods: {
    applyTheme(variables) {
      cssVars({ variables, rootElement: document.documentElement })
    },

    // applyTheme() {
    //   console.log('applying theme')
    //   const computedStyle = window.getComputedStyle(document.documentElement)

    //   console.log(computedStyle.getPropertyValue('--blue'))

    //   const div = document.createElement('div')
    //   document.body.appendChild(div)
    //   div.style.setProperty('color', 'var(--blue)')
    // },
  },
}
</script>

<style lang="scss" scoped>
</style>
