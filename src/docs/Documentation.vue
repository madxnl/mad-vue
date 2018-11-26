<template>
  <div class="_app">
    <nav class="_nav">
      <a class="_nav-brand" :href="'#' + getSectionId(sections[0])">
        <img src="./assets/mad-vue-logo.png" height="100"/>
        <h2>Mad-Vue</h2>
      </a>
      <a v-for="(section,i) in sections" :key="i"
        :href="'#' + getSectionId(section)"
        class="_nav-link" :class="{
          '-active':activeSection==section,
          '-subitem':section.subitem,
        }">
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

export default {
  data: () => ({
    sections: [
      { name: 'Installation', component: require('./docs/InstallationDocs').default },
      { name: 'Button', component: require('./docs/ButtonDocs').default, subitem: true },
      { name: 'Icons', component: require('./docs/IconDocs').default, subitem: true },
      { name: 'Form', component: require('./docs/FormDocs').default, subitem: true },
      { name: 'Input', component: require('./docs/InputDocs').default, subitem: true },
      { name: 'Select', component: require('./docs/SelectDocs').default, subitem: true },
      { name: 'Dropdown', component: require('./docs/FormDocs').default, subitem: true },
      { name: 'Menu', component: require('./docs/FormDocs').default, subitem: true },
      { name: 'Modal', component: require('./docs/ModalDocs').default, subitem: true },
      { name: 'Tabs', component: require('./docs/FormDocs').default, subitem: true },
      { name: 'Loading', component: require('./docs/FormDocs').default, subitem: true },
      { name: 'Messages', component: require('./docs/MessagesDocs').default, subitem: true },
      { name: 'Datatable', component: require('./docs/DatatableDocs').default, subitem: true },
      { name: 'Transition', component: require('./docs/FormDocs').default, subitem: true },
      { name: 'Custom styling', component: require('./docs/StylingDocs').default },
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
        if (bounds.top < window.innerHeight / 2 && bounds.bottom > window.innerHeight / 4) {
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


$navWidth: 240px;
$sectionWidth: 800px;

._app {
  justify-content: stretch;
  height: 100vh;
  padding-left: $navWidth;
}
._section {
  max-width: $sectionWidth;
  padding: 50px $margin;
  margin: 0 auto;
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
  position: fixed; left: 0; top: 0; bottom: 0;
  border-right: 1px solid rgba($text, 0.25);
  background: rgba($text, 0.1);
  width: $navWidth;
  padding: 1rem;
}
._nav-brand {
  text-align: center;
  color: inherit;
  text-decoration: none;
  img {
    margin: 0 auto;
    display: block;
    margin-bottom: .5rem;
  }
}
._nav-link {
  font-size: 110%;
  color: $text;
  display: block;
  text-decoration: none;
  padding: .25em .5em;
  transition: all .2s;
  &:hover {
    background: rgba($text, 0.1);
  }
  &.-active {
    background: rgba($text, 0.75);
    color: white;
  }
  // &.-subitem { margin-left: 1em; }
}
</style>