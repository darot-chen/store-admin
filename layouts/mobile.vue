<template>
  <div class="mx-auto mb-16 flex h-full max-w-lg flex-col">
    <slot name="header">
      <LayoutHeader />
    </slot>
    <main class="flex h-full w-full flex-col" data-scroll>
      <slot />
    </main>
    <slot name="footer">
      <LayoutFooter />
    </slot>
  </div>
</template>
