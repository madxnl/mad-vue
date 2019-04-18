<template>
  <div>
    <p>
      The <code>&lt;mad-icon&gt;</code> component supports the 2400+ icons from the <a href="https://materialdesignicons.com/">Material Design Icons' collection</a>, as well as country flag icons using <a href="https://github.com/lipis/flag-icon-css"><code>flag-icon-css</code></a>.
    </p>
    <component-example path="icon/IconExample" :props="props" :events="events" />
  </div>
</template>

<script>
export default {
  data: () => ({
    props: [
      {
        name: 'mdi',
        type: 'String',
        description: 'Set to <code>"submit"</code> to trigger form submit event on click.',
      },
      {
        name: 'flag',
        type: 'String',
        description: 'Two-letter country code to display a flag icon from <a href="https://github.com/lipis/flag-icon-css"><code>flag-icon-css</code></a>.',
      },
    ],
    events: null,
  }),
}
</script>
