<template>
  <div>
    <p>Component for select dropdowns. Features include option filtering, multiple select, and async search.</p>
    <component-example
      path="SelectExample"
      :props="props"
      :events="events"
      :slots="slots"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    props: [
      {
        name: 'v-model',
        description: 'Bind value and update on input (two-way binding).',
      },
      {
        name: 'value',
        description: 'The current value of the select.',
      },
      {
        name: 'options',
        type: 'Array|Function',
        description: 'Array of selectable options (any type) or a (async) function returning an array of options for a given query string.',
        required: true,
      },
      {
        name: 'multiple',
        type: 'Boolean',
        default: 'false',
        description: 'Allow multiple options to be selected, the values are emitted as an array.',
      },
      {
        name: 'disabled',
        type: 'Boolean',
        default: 'false',
        description: 'Disables select component.',
      },
      {
        name: 'placeholder',
        type: 'String',
        default: '"Please select"',
        description: 'Placeholder text when empty.',
      },
      {
        name: 'option-label',
        type: 'Function',
        description: 'Function that returns a label for an option. By default, select uses the the "label" or "name" field of each option or the option itself.',
      },
      {
        name: 'option-value',
        type: 'Function',
        description: 'Function that returns a value for a given option. By default, select uses the the "value" field of each option or the option itself.',
      },
      {
        name: 'value-equals',
        type: 'Function',
        description: 'Function that returns whether two values are equal.',
        default: 'lodash.isEqual',
      },
    ],
    events: [
      {
        name: 'input',
        description: 'Emitted with new selected value, or array of values in case of multiple select.',
      },
    ],
    slots: [
      {
        name: 'default',
        description: 'Scoped slot that can be used to customize rendering of options.',
      },
    ],
  }),
}
</script>
