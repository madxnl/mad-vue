<template>
  <div>
    <p>
      <mad-button>Button</mad-button>
      <mad-button flat color="blue">Button</mad-button>
      <mad-button color="red">Button</mad-button>
      <mad-button flat>Button</mad-button>
      <mad-button color="blue">Button</mad-button>
    </p>
    <p>
      <mad-button flat color="red" size="sm">Button</mad-button>
      <mad-button color="yellow" size="sm">Button</mad-button>
      <mad-button color="darkgray" size="sm">Button</mad-button>
      <mad-button color="#ffaa00" size="sm">Button</mad-button>
      <mad-button color="primary" size="sm" disabled>Button</mad-button>
      <mad-button flat color="primary" size="sm" disabled>Button</mad-button>
    </p>
    <p>
      <mad-button color="orange" size="lg">
        <mad-icon mdi="creation"/>
        Button
      </mad-button>
      <mad-button color="green" size="lg">
        <mad-icon mdi="cube"/>
        Button
      </mad-button>
    </p>
    <p>
      <mad-dropdown>
        <mad-button size="sm">Dropdown</mad-button>
        <mad-menu slot="dropdown">
          <mad-menu-item>test</mad-menu-item>
          <mad-menu-item>test</mad-menu-item>
        </mad-menu>
      </mad-dropdown>
    </p>
  </div>
</template>
