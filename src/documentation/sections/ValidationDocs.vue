<template>
  <div>
    <p>Form validation is done by the <code>&lt;mad-form-item&gt;</code> component. Pass the value to be validated with the <code>:value</code> attribute. Then add the <code>required</code> attribute to make the field required. </p>
    <p>All form items are validated automatically when form submission is triggered. If any are invalid, the submit handler on the form is not called and feedback is be displayed on the relevant item labels. An error message is shown using the <a href="#messages">messages</a> component if present.</p>
    <component-example name="ValidationExample" />
  </div>
</template>

<script>
export default {
}
</script>
