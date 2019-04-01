<template>
  <div>
    <p>
      Number input field. Auto-correct input type, format and decimal separator, configurable min/max values and number of decimals.
    </p>
    <component-example
      name="InputNumberExample"
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
        description: 'Bind value and update on input (two-way binding).'
      },
      {
        name: 'value',
        type: 'Number|String',
        description: 'The value of the input.'
      },
      {
        name: 'id',
        description: 'The id of the input.'
      },
      {
        name: 'min',
        type: 'Number',
        description: 'Minimum number value.'
      },
      {
        name: 'max',
        type: 'Number',
        description: 'Maximum number value.'
      },
      {
        name: 'separator',
        type: 'String',
        description: 'Shown decimal separator (default is "." or "," depending on locale)'
      },
    ],
    events: null,
    slots: [
      {
        name: 'default',
        description: 'Additional content inside the field before input.'
      },
      {
        name: 'after',
        description: 'Additional content inside the field after input.'
      },
    ],
  }),
}
</script>
