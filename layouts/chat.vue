<template>
  <div class="mx-auto flex h-full max-w-lg flex-col">
    <slot name="header">
      <LayoutChatHeader />
    </slot>
    <main class="mt-[50px] flex h-full w-full flex-col" data-scroll>
      <slot />
    </main>
    <slot name="footer">
      <LayoutFooter />
    </slot>
  </div>
</template>
