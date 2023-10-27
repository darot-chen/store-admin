<template>
  <div class="branding-container">
    <NSpace>
      <img style="margin-right: 2px" :width="store.isCollapse ? '60' : '40'"
        src="https://img.freepik.com/premium-vector/fast-shopping-logo-design-template-illustration-vector_382322-300.jpg"
        alt="Logo">
    </NSpace>
    <div>
      <h4 v-show="!store.isCollapse">Admin</h4>
    </div>
  </div>
</template>

<script setup>
import { NSpace } from "naive-ui";
import { useAppConfigStore } from '~/store/app_config_store';

const store = useAppConfigStore();

</script>

<style scoped>
.branding-container {
  height: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
  white-space: nowrap;
  margin-top: 10px;
  padding: 2px 10px;
  transition: all 0.2s ease-in-out;
}
</style>