<template>
  <div>
    <p>
      Date input component.
    </p>
    <component-example
      path="input-date/InputDateExample"
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
        description: 'The value of the input.',
      },
      {
        name: 'id',
        description: 'The id of the input.',
      },
      {
        name: 'rows',
        type: 'String|Number',
        description: 'Set to a number larger than 1 for multiline textarea.',
      },
    ],
    events: null,
    slots: [
      {
        name: 'default',
        description: 'Additional content inside the field before input.',
      },
      {
        name: 'after',
        description: 'Additional content inside the field after input.',
      },
    ],
  }),
}
</script>
