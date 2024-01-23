<template>
  <div class="safe-area-padding-bottom mx-auto flex h-full max-w-lg flex-col">
    <slot name="header">
      <LayoutChatRoomHeader />
    </slot>
    <main class="bg-red mt-[60px] flex h-full w-full flex-col">
      <slot />
    </main>
    <slot name="footer">
      <LayoutFooter />
    </slot>
  </div>
</template>

<script setup lang="ts"></script>
