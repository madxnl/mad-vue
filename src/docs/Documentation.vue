<template>
  <div class="app">
    <nav>
      <h4 class="pad space-sm">
        <a v-for="(chapter,i) in chapters" :key="i"
          :href="'#' + chapter.name.replace(' ','-')">
          {{chapter.name}}
        </a>
      </h4>
    </nav>
    <main>
      <section v-for="(chapter,i) in chapters" :key="i"
        class="_section"
        :id="chapter.name.replace(' ','-')">
        <component :is="chapter.component"/>
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

import InstallationDocs from './components/InstallationDocs'
import LayoutDocs from './components/LayoutDocs'
import TypographyDocs from './components/TypographyDocs'
import IconDocs from './components/IconDocs'
import ButtonDocs from './components/ButtonDocs'
import ModalDocs from './components/ModalDocs'
import FormDocs from './components/FormDocs'
import SelectDocs from './components/SelectDocs'
// import ValidationDocs from './components/ValidationDocs'
import MessagesDocs from './components/MessagesDocs'
import AsyncDocs from './components/AsyncDocs'

export default {
  data: () => ({
    chapters: [
      { name: 'Installation', component: InstallationDocs },
      // { name: 'Layout', component: LayoutDocs },
      // { name: 'Typography', component: TypographyDocs },
      { name: 'Form', component: FormDocs },
      { name: 'Select', component: SelectDocs },
      { name: 'Button', component: ButtonDocs },
      { name: 'Icon', component: IconDocs },
      { name: 'Modal', component: ModalDocs },
      // { name: 'Validation', component: ValidationDocs },
      { name: 'Messages', component: MessagesDocs },
      { name: 'Async loading', component: AsyncDocs },
    ],
  }),
}
</script>

<style lang="scss">
._section {
  padding: 1.5em .5em;
}

</style>