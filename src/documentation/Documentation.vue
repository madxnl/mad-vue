<template>
  <div class="app">
    <nav class="nav">
      <a class="nav-brand" :href="'#' + getSectionId(sections[0])">
        <img src="@/assets/mad-vue-logo.png" height="100">
        <h2>Mad-Vue</h2>
        {{ version }}
      </a>
      <a
        v-for="(section,i) in sections"
        :key="i"
        :href="'#' + getSectionId(section)"
        class="nav-link"
        :class="{
          '-active':activeSection==section,
          '-mono': section.mono,
        }"
      >
        {{ '&nbsp; &nbsp;'.repeat(section.indent) }}
        <component :is="section.mono ? 'code' : 'span'">
          {{ section.name }}
        </component>
      </a>
    </nav>
    <main class="main">
      <section
        v-for="(section,i) in sections"
        :id="getSectionId(section)"
        :key="i"
        class="section"
      >
        <h1 class="section-title">
          <component :is="section.mono ? 'code' : 'span'">
            {{ section.name }}
          </component>
        </h1>
        <component :is="section.component" />
      </section>
    </main>
    <!-- <mad-messages/> -->
  </div>
</template>

<script>
import './scss/main.scss'

export default {
  data: () => ({
    sections: [
      { name: 'Installation', component: require('./sections/InstallationDocs').default },
      { name: 'Components', component: require('./sections/StylingDocs').default },
      { name: 'button', component: require('../components/button/ButtonDocs').default, indent: 1, mono: true },
      { name: 'icon', component: require('../components/icon/IconDocs').default, indent: 1, mono: true },
      { name: 'form', component: require('../components/form/FormDocs').default, indent: 1, mono: true },
      { name: 'form-item', component: require('../components/form-item/FormItemDocs').default, indent: 1, mono: true },
      { name: 'input', component: require('../components/input/InputDocs').default, indent: 1, mono: true },
      { name: 'input-date', component: require('../components/input-date/InputDateDocs').default, indent: 1, mono: true },
      { name: 'input-number', component: require('../components/input-number/InputNumberDocs').default, indent: 1, mono: true },
      { name: 'input-file', component: require('../components/input-file/InputFileDocs').default, indent: 1, mono: true },
      { name: 'input-image', component: require('../components/input-image/InputImageDocs').default, indent: 1, mono: true },
      { name: 'select', component: require('../components/select/SelectDocs').default, indent: 1, mono: true },
      { name: 'dropdown', component: require('../components/dropdown/DropdownDocs').default, indent: 1, mono: true },
      { name: 'modal', component: require('../components/modal/ModalDocs').default, indent: 1, mono: true },
      { name: 'tabs', component: require('../components/tabs/TabsDocs').default, indent: 1, mono: true },
      { name: 'loading', component: require('../components/loading/LoadingDocs').default, indent: 1, mono: true },
      { name: 'messages', component: require('../components/message/MessagesDocs').default, indent: 1, mono: true },
      { name: 'datatable', component: require('../components/datatable/DatatableDocs').default, indent: 1, mono: true },
      { name: 'transition', component: require('../components/transition/TransitionDocs').default, indent: 1, mono: true },
      { name: 'Styling', component: require('./sections/StylingDocs').default },
    ],
    activeSection: null,
  }),

  computed: {
    version() {
      return process.env.PACKAGE_VERSION
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

  methods: {
    getSectionId(section) {
      return section.name.replace(' ', '-')
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
}
</script>

<style lang="scss" scoped>
@import './scss/vars';

$sectionWidth: 900px;
$navWidth: 220px;

.app {
  justify-content: stretch;
  // height: 100vh;
  // width: 100vw;
  display: flex;
  padding-left: $navWidth;
  overflow-x: hidden;
}
.section {
  max-width: $sectionWidth;
  padding: 50px 1.5rem;
  margin: 0 auto;
}
.section-title {
  margin-bottom: 1.5em;
}
.main {
  margin: auto;
}
.nav {
  position: fixed;
  left: 0; bottom: 0; top: 0;
  width: $navWidth;
  overflow-y: auto;
  background: rgba($text, 0.15);
}
.nav-brand {
  text-align: center;
  color: inherit;
  text-decoration: none;
  display: block;
  margin: 30px 0;
  img {
    margin: 0 auto .5rem auto;
    display: block;
  }
}
.nav-link {
  // font-weight: bold;
  color: $text;
  display: block;
  text-decoration: none;
  padding: 3px 20px;
  font-size: 110%;
  transition: all .2s;
  &:hover {
    background: rgba($text, 0.1);
  }
  &.-active {
    font-weight: bold;
    background: rgba($text, 0.1);
  }
}
</style>
