import Vue from 'vue'



// Vue.directive('on-visibility', {
//   bind(el, binding, vnode) {
//     el._visScrollHandler = event => {
//       const rect = el.getBoundingClientRect()
//       const yVisible = rect.top < window.innerHeight && rect.bottom > 0
//       const xVisible = rect.left < window.innerWidth && rect.right > 0
//       const visible = xVisible && yVisible
//       if (el._detectVisibleCurrent != visible) {
//         el._detectVisibleCurrent = visible
//         binding.value(visible)
//       }
//     }
//     window.addEventListener('scroll', el._visScrollHandler, { passive: true })
//   },
//   unbind(el, binding, vnode) {
//     window.removeEventListener('scroll', el._visScrollHandler)
//   },
// })

