<template>
  <div>
    <p>
      <mad-button>Button</mad-button>
      <mad-button color="red">Button</mad-button>
      <mad-button color="blue">Button</mad-button>
      <mad-button variant="flat">Button</mad-button>
      <mad-button variant="flat" color="blue">Button</mad-button>
    </p>
    <p>
      <mad-button size="xs" color="rgb(100,100,50)">
        <mad-icon mdi="star"/>
        Button
      </mad-button>
      <mad-button size="sm" color="#ddaa00">
        <mad-icon mdi="balloon"/>
        Button
      </mad-button>
      <mad-button size="lg" color="primary">
        <mad-icon mdi="cube"/>
        Button
      </mad-button>
      <mad-button size="xl" color="green">
        <mad-icon mdi="creation"/>
        Button
      </mad-button>
      <mad-button size="200%" color="red">
        <mad-icon mdi="rocket"/>
        Button
      </mad-button>
    </p>
    <p>
      <mad-button color="primary" disabled>Disabled</mad-button>
      <mad-button variant="flat" color="primary" disabled>Disabled</mad-button>
      <mad-button color="primary" active>Active</mad-button>
      <mad-button variant="flat" color="primary" active>Active</mad-button>
      <!-- <mad-button variant="flat" color="primary" loading>Loading</mad-button> -->
      <!-- <mad-button color="primary" loading>Loading</mad-button> -->
    </p>
  </div>
</template>
