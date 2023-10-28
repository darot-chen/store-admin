<template>
  <NLayoutHeader bordered>
    <div class="nav-bar">
      <NInput v-model:value="query" placeholder="Search">
        <template #prefix>
          <NIcon>
            <SearchOutline />
          </NIcon>
        </template>
      </NInput>
    </div>
  </NLayoutHeader>
</template>

<script setup lang="ts">
import { NLayoutHeader, NInput, NIcon } from "naive-ui";
import { SearchOutline } from "@vicons/ionicons5";

const query = ref('');

</script>

<style scoped>
.nav-bar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}
</style>