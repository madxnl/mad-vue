<template>
  <div>
    <p>
      <mad-button>Button</mad-button>
      <mad-button color="red">Button</mad-button>
      <mad-button color="blue">Button</mad-button>
      <mad-button flat>Button</mad-button>
      <mad-button flat color="blue">Button</mad-button>
    </p>
    <p>
      <mad-button size="tiny" color="rgb(100,100,50)">
        <mad-icon mdi="star"/>
        Button
      </mad-button>
      <mad-button size="small" color="#ddaa00">
        <mad-icon mdi="balloon"/>
        Button
      </mad-button>
      <mad-button color="red">
        <mad-icon mdi="rocket"/>
        Button
      </mad-button>
      <mad-button size="large" color="primary">
        <mad-icon mdi="cube"/>
        Button
      </mad-button>
      <mad-button size="huge" color="green">
        <mad-icon mdi="creation"/>
        Button</mad-button>
    </p>
    <p>
      <mad-button color="primary" disabled>Disabled</mad-button>
      <mad-button flat color="primary" disabled>Disabled</mad-button>
      <mad-button color="primary" active>Active</mad-button>
      <mad-button flat color="primary" active>Active</mad-button>
      <mad-button flat color="primary" loading>Loading</mad-button>
      <mad-button color="primary" loading>Loading</mad-button>
    </p>
  </div>
</template>
