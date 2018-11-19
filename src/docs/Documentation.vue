<template>
  <div class="_app">
    <nav class="_nav">
      <p class="_nav-brand">
        <a :href="'#' + getSectionId(sections[0])">
          <img src="./assets/mad-vue-logo.png" height="150"/>
        </a>
      </p>
      <a v-for="(section,i) in sections" :key="i"
        :href="'#' + getSectionId(section)"
        class="_nav-link" :class="{'-active':activeSection==section}">
        {{section.name}}
      </a>
    </nav>
    <main class="_main">
      <section v-for="(section,i) in sections" :key="i"
        class="_section"
        :id="getSectionId(section)">
        <h1 class="_section-title">
          {{section.name}}
        </h1>
        <component :is="section.component"/>
      </section>
    </main>
    <mad-messages/>
  </div>
</template>

<script>
import './docs.scss'

import CodeExample from './components/CodeExample'
import CodeBlock from './components/CodeBlock'

import Vue from 'vue'
Vue.component('CodeExample', CodeExample)
Vue.component('CodeBlock', CodeBlock)

export default {
  data: () => ({
    sections: [
      { name: 'Installation', component: require('./docs/InstallationDocs').default },
      // { name: 'Layout', component: require('./docs/LayoutDocs').default },
      // { name: 'Typography', component: require('./docs/TypographyDocs').default },
      { name: 'Form', component: require('./docs/FormDocs').default },
      { name: 'Select', component: require('./docs/SelectDocs').default },
      { name: 'Button', component: require('./docs/ButtonDocs').default },
      { name: 'Icon', component: require('./docs/IconDocs').default },
      { name: 'Modal', component: require('./docs/ModalDocs').default },
      // { name: 'Validation', component: require('./docs/ValidationDocs').default },
      { name: 'Messages', component: require('./docs/MessagesDocs').default },
      { name: 'Async loading', component: require('./docs/AsyncDocs').default },
    ],
    activeSection: null,
  }),

  methods: {
    getSectionId(section) {
      return section.name.replace(' ','-')
    },

    updateActiveSection() {
      this.activeSection = this.sections.find(section => {
        const id = this.getSectionId(section)
        const el = document.getElementById(id)
        const bounds = el.getBoundingClientRect()
        if (bounds.top < window.innerHeight / 2 && bounds.bottom > window.innerHeight / 2) {
          return section
        }
      })
    },
  },

  mounted() {
    this.updateActiveSection()
    this.scrollListener = e => this.updateActiveSection()
    addEventListener('scroll', this.scrollListener, { passive: true })
  },

  beforeDestroy() {
    removeEventListener('scroll', this.scrollListener)
  },
}
</script>

<style lang="scss" scoped>
@import './docs';


$navWidth: 300px;

._app {
  padding-left: $navWidth;
}
._section {
  max-width: 800px;
  min-height: 60vh;
  margin: 0 auto 0 auto;
  padding: 50px $margin;
}
._section-title {
  // background: $text;
  // color: white;
  // padding: .5em .5em;
  // border-bottom: 1px solid $primary;
  margin-bottom: 1.5em;
}
._main {
}
._nav {
  background: rgba($text, 0.1);
  width: $navWidth;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}
._nav-brand {
  img {
    margin: 0 auto;
    display: block;
  }
}
._nav-link {
  font-size: 110%;
  color: $text;
  display: block;
  text-decoration: none;
  padding: .25em .5em;
  transition: all .2s;
  &:not(:last-child) {
    border-bottom: 1px solid rgba($text, 0.2);
  }
  &:hover {
    background: rgba(white, 0.1);
  }
  &.-active {
    background: rgba($text, 0.75);
    color: white;
  }
}
</style>