<template>
  <div>
    <p>Component for select dropdowns. Features include option filtering, multiple select, and async search.</p>
    <component-example
      path="select/SelectExample"
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
        description: 'The current value of the selext.',
      },
      {
        name: 'options',
        type: 'Array|Function',
        description: 'Array of selectable options, options themselves can be any type. Alternatively, a function that returns a list of options for a given query string, this function can also be async.',
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
        type: 'String|Function',
        description: 'Override the way option labels are derived. By default, select tries to render the "label" or "name" attribute of each option. Set to a string to use that field in each option, or a function that takes an option and returns a label string.',
      },
      {
        name: 'option-value',
        type: 'String|Function',
        description: 'By default, select uses the the "value" field of each option, or the entire option itself as a value. Set to a string to use that field in each option, or a function that takes an option and returns a value for that option.',
      },
      {
        name: 'value-key',
        type: 'String|Function',
        description: 'To check if two values are equal, select tries to use the "id" or "key" field of each value, or the entire value itself, and does a deep comparison using lodash.isEqual. Set to a string to use that field as unique key for option, or a function that takes an option and returns a key for that option.',
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
