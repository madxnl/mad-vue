<template>
  <div>
    <p>
      <mad-button>Button</mad-button>
      <mad-button class="red">
        Button
      </mad-button>
      <mad-button class="bg-blue">
        Button
      </mad-button>
      <mad-button class="bg-white">
        Button
      </mad-button>
    </p>
    <p>
      <mad-button class="size-sm bg-yellow">
        <mad-icon mdi="balloon" />
        Button
      </mad-button>
      <mad-button class="bg-red">
        <mad-icon mdi="balloon" />
        Button
      </mad-button>
      <mad-button class="size-lg bg-primary">
        <mad-icon mdi="cube" />
        Button
      </mad-button>
      <mad-button class="size-xl bg-green">
        <mad-icon mdi="creation" />
        Button
      </mad-button>
      <mad-button class="bg-red" style="font-size:200%">
        <mad-icon mdi="rocket" />
        Button
      </mad-button>
    </p>
    <p>
      <mad-button class="bg-primary" disabled>
        Disabled
      </mad-button>
      <mad-button class="primary" disabled>
        Disabled
      </mad-button>
      <mad-button class="bg-primary" active>
        Active
      </mad-button>
      <mad-button class="primary" active>
        Active
      </mad-button>
    </p>
    <p>
      <mad-button class="bg-primary">
        Notifications
        <span class="mad-badge bg-white size-xs">2</span>
      </mad-button>
    </p>
  </div>
</template>
