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
export default {
  data: () => ({
    sections: [
      { name: 'Installation', component: require('./components/InstallationDocs').default },
      { name: 'Theme', component: require('./components/ThemeDocs').default },
      { name: 'Typography', component: require('./components/TypographyDocs').default },
      { name: 'Layout', component: require('./components/LayoutDocs').default },
      { name: 'Components', component: require('./components/ComponentsDocs').default },
      // { name: 'Components', component: require('./components/StylingDocs').default },
      { name: 'button', component: require('./components/ButtonDocs').default, indent: 1, mono: true },
      { name: 'icon', component: require('./components/IconDocs').default, indent: 1, mono: true },
      { name: 'form', component: require('./components/FormDocs').default, indent: 1, mono: true },
      { name: 'form-item', component: require('./components/FormItemDocs').default, indent: 1, mono: true },
      { name: 'input', component: require('./components/InputDocs').default, indent: 1, mono: true },
      { name: 'input-date', component: require('./components/InputDateDocs').default, indent: 1, mono: true },
      { name: 'input-number', component: require('./components/InputNumberDocs').default, indent: 1, mono: true },
      { name: 'input-file', component: require('./components/InputFileDocs').default, indent: 1, mono: true },
      { name: 'input-image', component: require('./components/InputImageDocs').default, indent: 1, mono: true },
      { name: 'select', component: require('./components/SelectDocs').default, indent: 1, mono: true },
      { name: 'dropdown', component: require('./components/DropdownDocs').default, indent: 1, mono: true },
      { name: 'modal', component: require('./components/ModalDocs').default, indent: 1, mono: true },
      { name: 'tabs', component: require('./components/TabsDocs').default, indent: 1, mono: true },
      { name: 'loading', component: require('./components/LoadingDocs').default, indent: 1, mono: true },
      { name: 'messages', component: require('./components/MessagesDocs').default, indent: 1, mono: true },
      { name: 'datatable', component: require('./components/DatatableDocs').default, indent: 1, mono: true },
      { name: 'transition', component: require('./components/TransitionDocs').default, indent: 1, mono: true },
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');

html {
  font-family: 'Lato', sans-serif;
}

code, .code {
  font-family: monospace;
  font-size: 90%;
  // background: rgba(black, 0.05);
  // line-height: 0.8;
}

.container {
  padding: 1rem;
  & > :last-child { margin-bottom: 0; }
}

@import '~highlight.js/styles/github.css';

.hljs {
  background: none !important;
  padding: 0 !important;
}

.card {
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(black, 0.05);
}

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
  background: rgba(black, 0.05);
  border-right: 1px solid rgba(black, 0.2);
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
  color: black;
  display: block;
  text-decoration: none;
  padding: 3px 20px;
  font-size: 110%;
  transition: all .2s;
  &:hover {
    background: rgba(black, 0.1);
  }
  &.-active {
    font-weight: bold;
    background: rgba(black, 0.1);
  }
}
</style>
