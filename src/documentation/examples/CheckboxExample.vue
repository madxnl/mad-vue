<template>
  <mad-form @submit="onSubmit">
    <mad-form-item label="Message" :value="''" required>
      <mad-input v-model="message" />
    </mad-form-item>

    <mad-form-item label="Date and time" :value="datetime" required>
      <mad-input-date v-model="datetime" time seconds />
    </mad-form-item>

    <mad-form-item label="Checkboxes">
      {{ checked }}
      <mad-checkbox v-model="checked[0]">
        Checkbox
      </mad-checkbox>
      <mad-checkbox v-model="checked[1]">
        Checkbox
      </mad-checkbox>
      <!-- <mad-switch v-model="checked">{{checked}}</mad-switch> -->
    </mad-form-item>
    <mad-form-item label="Radio">
      {{ radioValue }}
      <mad-checkbox v-model="radioValue" value="a" class="red">
        Radio 1
      </mad-checkbox>
      <mad-checkbox v-model="radioValue" value="b">
        Radio 2
      </mad-checkbox>
      <!-- <mad-switch v-model="checked">{{checked}}</mad-switch> -->
    </mad-form-item>
    <mad-form-item label="Independent check">
      <mad-checkbox value="a">
        Check
      </mad-checkbox>
      <mad-checkbox intermediate>
        Check
      </mad-checkbox>
      <!-- <mad-switch v-model="checked">{{checked}}</mad-switch> -->
    </mad-form-item>
    <p>
      <mad-button type="submit" class="bg-primary">
        Submit
      </mad-button>
    </p>
  </mad-form>
</template>

<script>
export default {
  data: () => ({
    message: '',
    datetime: new Date(),
    checked: [true, false],
    radioValue: [],
  }),

  methods: {
    onSubmit() {
      this.$mad.message.success(`Submitted message "${this.message}"`)
      this.message = ''
    },

    validator(x) {
      // return 'nope'
    },
  },
}
</script>
