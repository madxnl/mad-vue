<template>
  <div>
    <p>Button component, styled using css classes:</p>
    <component-example name="ButtonExample" :props="props" :events="events" />
  </div>
</template>

<script>
export default {
  data: () => ({
    props: [
      {
        name: 'type',
        type: 'String',
        description: 'Set to <code>"submit"</code> to trigger form submit event on click.',
        default: '"button"',
      },
      {
        name: 'disabled',
        type: 'Boolean',
        description: 'Disable button.',
      },
      {
        name: 'active',
        type: 'Boolean',
        description: 'Style button as active.',
      },
    ],
    events: null,
  }),
}
</script>
