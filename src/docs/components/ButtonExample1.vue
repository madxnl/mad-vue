<template>
  <div>
    <p>
      <mad-button>Button</mad-button>
      <mad-button color="blue">Button</mad-button>
      <mad-button bg="red">Button</mad-button>
      <mad-button raised>Button</mad-button>
      <mad-button raised bg="blue">Button</mad-button>
    </p>
    <p>
      <mad-button color="red" size="sm">Button</mad-button>
      <mad-button bg="yellow" color="darkgray" size="sm">Button</mad-button>
      <mad-button bg="darkgray" size="sm">Button</mad-button>
      <mad-button bg="#55dbac" size="sm">Button</mad-button>
    </p>
    <p>
      <mad-button bg="orange" size="h2">
        <mad-icon mdi="creation"/>
        Button
      </mad-button>
      <mad-button bg="green" size="h2">
        <mad-icon mdi="cube"/>
        Button
      </mad-button>
    </p>
    <p>
      <mad-dropdown>
        <mad-button raised size="sm">Dropdown</mad-button>
        <mad-menu slot="dropdown">
          <mad-menu-item>test</mad-menu-item>
          <mad-menu-item>test</mad-menu-item>
        </mad-menu>
      </mad-dropdown>
    </p>
  </div>
</template>
