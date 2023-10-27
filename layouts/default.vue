<template>
  <NSpace vertical>
    <NLayout has-sider>
      <SideBarMenu />
      <NLayout>
        <HeaderMenu />
        <NLayoutContent content-style="padding: 14px; min-height: calc(100vh - 110px)">
          <slot />
        </NLayoutContent>
      </NLayout>

    </NLayout>
  </NSpace>
</template>

<script setup>
import { NLayout, NLayoutContent } from 'naive-ui';
</script>

<style scoped></style>