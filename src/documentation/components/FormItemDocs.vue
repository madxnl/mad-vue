<template>
  <div>
    <p>
      A form consists of a <code>&lt;mad-form&gt;</code> component containing one or more <code>&lt;mad-form-item&gt;</code> components.
      When the submit event is triggered inside a form (for example by clicking a button with <code>type="submit"</code>), all form-item components will be validated.
      The form will emit the "submit" event only if all form-items are valid.
    </p>
    <component-example
      path="FormItemExample"
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
        name: 'label',
        type: 'String',
        description: 'The label text, required.',
      },
      {
        name: 'value',
        description: 'The value to be validated.',
      },
      {
        name: 'required',
        type: 'Boolean',
        description: 'Marks the form item as required. If the <code>value</code> prop is falsy when the form-item is validated, an error message is shown after the label.',
      },
      {
        name: 'required-message',
        type: 'String',
        description: 'Customize the required error message.',
        default: '"is required"',
      },
      {
        name: 'validator',
        type: 'Function',
        description: 'Custom validator function. When the form-item is validated, the function is called with the <code>value</code> as parameter and should return an error message string if the value is invalid. Can be async.',
      },
    ],
    events: null,
    slots: [
      {
        name: 'label',
        description: 'Named slot can be used instead of <code>label</code> prop if html content is needed inside label.',
      },
    ],
  }),
}
</script>
