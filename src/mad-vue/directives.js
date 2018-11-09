import Vue from 'vue'



// Vue.directive('on-visibility', {
//   bind(el, binding, vnode) {
//     el.__visScrollHandler = event => {
//       const rect = el.getBoundingClientRect()
//       const yVisible = rect.top < window.innerHeight && rect.bottom > 0
//       const xVisible = rect.left < window.innerWidth && rect.right > 0
//       const visible = xVisible && yVisible
//       if (el.__detectVisibleCurrent != visible) {
//         el.__detectVisibleCurrent = visible
//         binding.value(visible)
//       }
//     }
//     window.addEventListener('scroll', el.__visScrollHandler, { passive: true })
//   },
//   unbind(el, binding, vnode) {
//     window.removeEventListener('scroll', el.__visScrollHandler)
//   },
// })

