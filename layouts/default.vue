<template>
  <NSpace vertical>
    <NLayout position="absolute" has-sider>
      <SideBarMenu />
      <NLayout>
        <HeaderMenu />
        <NMessageProvider>
          <NLayoutContent content-style="padding: 14px; min-height: calc(100vh - 110px)">
            <slot />
          </NLayoutContent>
        </NMessageProvider>
      </NLayout>

    </NLayout>
  </NSpace>
</template>

<script setup>
import { NLayout, NLayoutContent, NMessageProvider } from 'naive-ui';
</script>

<style scoped></style>