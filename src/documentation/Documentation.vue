<template>
  <div class="app">
    <nav class="nav">
      <a class="nav-brand" :href="'#' + getSectionId(sections[0])">
        <img src="./assets/mad-vue-logo.png" height="100"/>
        <h2>Mad-Vue</h2>
      </a>
      <a v-for="(section,i) in sections" :key="i"
        :href="'#' + getSectionId(section)"
        class="nav-link" :class="{
          '-active':activeSection==section,
        }">
        {{section.name}}
      </a>
    </nav>
    <main class="main">
      <section v-for="(section,i) in sections" :key="i"
        class="section"
        :id="getSectionId(section)">
        <h1 class="section-title">
          {{section.name}}
        </h1>
        <component :is="section.component"/>
      </section>
    </main>
    <mad-messages/>
  </div>
</template>

<script>
import './scss/main.scss'

export default {
  data: () => ({
    sections: [
      { name: 'Installation', component: require('./sections/InstallationDocs').default },
      { name: 'Button', component: require('./sections/ButtonDocs').default },
      { name: 'Icons', component: require('./sections/IconDocs').default },
      { name: 'Form', component: require('./sections/FormDocs').default },
      { name: 'Input', component: require('./sections/InputDocs').default },
      { name: 'Select', component: require('./sections/SelectDocs').default },
      { name: 'Dropdown', component: require('./sections/FormDocs').default },
      { name: 'Menu', component: require('./sections/FormDocs').default },
      { name: 'Modal', component: require('./sections/ModalDocs').default },
      { name: 'Tabs', component: require('./sections/FormDocs').default },
      { name: 'Loading', component: require('./sections/LoadingDocs').default },
      { name: 'Messages', component: require('./sections/MessagesDocs').default },
      { name: 'Datatable', component: require('./sections/DatatableDocs').default },
      { name: 'Transition', component: require('./sections/FormDocs').default },
      { name: 'Customize', component: require('./sections/StylingDocs').default },
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
@import './scss/vars';

$navWidth: 220px;
$sectionWidth: 800px;

.app {
  justify-content: stretch;
  height: 100vh;
  padding-left: $navWidth;
}
.section {
  max-width: $sectionWidth;
  padding: 50px 1.5rem;
  margin: 0 auto;
}
.section-title {
  // background: $text;
  // color: white;
  // padding: .5em .5em;
  // border-bottom: 1px solid $primary;
  margin-bottom: 1.5em;
}
.main {
  margin-bottom: 300px;
}
.nav {
  position: fixed; left: 0; top: 0; bottom: 0;
  // border-right: 1px solid rgba($text, 0.25);
  background: rgba($text, 0.15);
  width: $navWidth;
  // padding: 1rem;
}
.nav-brand {
  text-align: center;
  color: inherit;
  text-decoration: none;
  img {
    margin: 1rem auto;
    display: block;
    margin-bottom: .5rem;
  }
}
.nav-link {
  font-size: 110%;
  color: $text;
  display: block;
  text-decoration: none;
  padding: .25em 1.5em;
  transition: all .2s;
  &:hover {
    background: rgba($text, 0.1);
  }
  &.-active {
    font-weight: bold;
    background: rgba($text, 0.75);
    color: white;
  }
}
</style>
