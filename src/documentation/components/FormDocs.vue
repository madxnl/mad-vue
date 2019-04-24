<template>
  <div>
    <p>
      A form consists of a <code>&lt;mad-form&gt;</code> component containing one or more <code>&lt;mad-form-item&gt;</code> components.
      When the submit event is triggered inside a form (for example by clicking a button with <code>type="submit"</code>), all form-item components will be validated.
      The form will emit the "submit" event only if all form-items are valid.
    </p>
    <component-example path="FormExample" :props="props" :events="events" />
  </div>
</template>

<script>
export default {
  data: () => ({
    props: null,
    events: [
      {
        name: 'submit',
        description: 'Submit event is only emitted when the user submits the form and all form-items are valid.',
      },
    ],
  }),
}
</script>
