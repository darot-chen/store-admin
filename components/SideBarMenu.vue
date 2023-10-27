<template>
  <NLayoutSider bordered collapse-mode="width" :collapsed-width="70" :width="240" :collapsed="appConfig.isCollapse"
    show-trigger @collapse="appConfig.toggle()" @expand="appConfig.toggle()">
    <BrandingLogo />
    <NMenu :collapsed="appConfig.isCollapse" :collapsed-width="64" :collapsed-icon-size="22" :options="getMenuItems()" />
  </NLayoutSider>
</template>

<script setup lang="ts">
import { NLayoutSider, NMenu } from 'naive-ui';
import { useAppConfigStore } from '~/store/app_config_store';
import { getMenuItems } from '~/constants/menu';

const appConfig = useAppConfigStore();

</script>

<style scoped>
.n-layout-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  height: 100vh;
  z-index: 13;
  transition: all 0.2s ease-in-out;
}
</style>